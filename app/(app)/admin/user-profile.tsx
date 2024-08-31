import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../../hooks/useAuth';

export default function AdminUserProfile() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);
  const { profile, makeAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!profile?.is_admin) {
      router.replace('/home');
    } else {
      fetchUserData();
    }
  }, [profile, id]);

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
    } else {
      setUser(data);
    }
  };

  const handleMakeAdmin = async () => {
    try {
      await makeAdmin(id as string);
      fetchUserData();
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  if (!profile?.is_admin) {
    return null; // This will prevent any flashing of content before redirect
  }

  if (!user) {
    return <Text className="text-pizza-red font-pizza">Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-pizza-white p-4">
      <Text className="text-2xl font-bold mb-4 text-pizza-red font-pizza">User Profile</Text>
      <Text className="text-pizza-red font-pizza mb-2">Email: {user.email}</Text>
      <Text className="text-pizza-red font-pizza mb-2">Name: {user.first_name} {user.last_name}</Text>
      <Text className="text-pizza-red font-pizza mb-2">Location: {user.location}</Text>
      <Text className="text-pizza-red font-pizza mb-2">Pizzas bought: {user.pizzas_bought}</Text>
      <Text className="text-pizza-red font-pizza mb-4">Free pizzas earned: {user.free_pizzas_earned}</Text>
      <Text className="text-pizza-red font-pizza mb-4">Admin: {user.is_admin ? 'Yes' : 'No'}</Text>
      {!user.is_admin && (
        <TouchableOpacity
          className="bg-pizza-yellow rounded-md p-3 mt-4"
          onPress={handleMakeAdmin}
        >
          <Text className="text-pizza-red text-center font-bold font-pizza">Make Admin</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}