import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../services/supabase';
import { schedulePizzaNotification } from '../../../services/notificationService';

export default function AdminUserProfile() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const addPizza = async () => {
    const { data, error } = await supabase
      .from('pizza_history')
      .insert({ user_id: id });

    if (error) {
      console.error('Error adding pizza:', error);
    } else {
      fetchUserData();
      if ((user.pizzas_bought + 1) % 9 === 0) {
        await schedulePizzaNotification();
      }
    }
  };

  if (!user) {
    return <Text className="text-pizza-red font-pizza">Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-pizza-white p-4">
      <Text className="text-2xl font-bold mb-4 text-pizza-red font-pizza">User Profile</Text>
      <Text className="text-pizza-red font-pizza mb-2">Email: {user.email}</Text>
      <Text className="text-pizza-red font-pizza mb-2">Name: {user.first_name}</Text>
      <Text className="text-pizza-red font-pizza mb-2">Pizzas bought: {user.pizzas_bought}</Text>
      <Text className="text-pizza-red font-pizza mb-4">Free pizzas earned: {user.free_pizzas_earned}</Text>
      <TouchableOpacity
        className="bg-pizza-yellow rounded-md p-3"
        onPress={addPizza}
      >
        <Text className="text-pizza-red text-center font-bold font-pizza">Add Pizza</Text>
      </TouchableOpacity>
    </View>
  );
}