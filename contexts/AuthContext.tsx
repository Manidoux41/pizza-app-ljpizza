import React, { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { User, Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  location: string;
  is_admin: boolean;
  pizzas_bought: number;
  free_pizzas_earned: number;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, location: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  }, []);

  useEffect(() => {
    const setupSession = async () => {
      setLoading(true);
      const storedSession = await AsyncStorage.getItem('userSession');
      if (storedSession) {
        const sessionData = JSON.parse(storedSession);
        supabase.auth.setSession(sessionData);
      }

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else if (session) {
        setSession(session);
        setUser(session.user);
        await refreshProfile(session.user.id);
        await AsyncStorage.setItem('userSession', JSON.stringify(session));
      }
      setLoading(false);
    };

    setupSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      if (session) {
        setSession(session);
        setUser(session.user);
        await refreshProfile(session.user.id);
        await AsyncStorage.setItem('userSession', JSON.stringify(session));
      } else {
        setSession(null);
        setUser(null);
        setProfile(null);
        await AsyncStorage.removeItem('userSession');
      }
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, location: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ 
            id: data.user.id, 
            email: data.user.email,
            first_name: firstName,
            last_name: lastName,
            location: location,
            is_admin: false,
            pizzas_bought: 0,
            free_pizzas_earned: 0
          });
        if (profileError) throw profileError;
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session) {
        await AsyncStorage.setItem('userSession', JSON.stringify(data.session));
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      setSession(null);
      await AsyncStorage.removeItem('userSession');
      router.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile: () => user ? refreshProfile(user.id) : Promise.resolve(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};