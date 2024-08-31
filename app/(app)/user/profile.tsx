import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import QRCode from '../../../components/QRCode';

export default function UserProfile() {
  const { user, signOut } = useAuth();

  return (
    <View className="flex-1 bg-pizza-white p-4">
      <Text className="text-2xl font-bold mb-4 text-pizza-red font-pizza">Your Profile</Text>
      <Text className="text-pizza-red font-pizza mb-2">Email: {user?.email}</Text>
      <Text className="text-pizza-red font-pizza mb-4">Name: {user?.first_name}</Text>
      <QRCode value={user?.id || ''} />
      <TouchableOpacity
        className="bg-pizza-red rounded-md p-3 mt-4"
        onPress={signOut}
      >
        <Text className="text-pizza-white text-center font-bold font-pizza">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}