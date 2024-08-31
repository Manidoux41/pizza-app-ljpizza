import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !profile) {
      router.replace('/');
    }
  }, [loading, profile]);

  if (loading || !profile) {
    return null; // Or a loading indicator
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#FFC300',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: '#FFC300',
        },
        headerTintColor: '#FF0000',
        headerTitleStyle: {
          fontFamily: 'PizzaFont',
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {profile.is_admin && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}