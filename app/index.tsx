import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <View><Text>Chargement...</Text></View>;
  }

  if (user) {
    return <Redirect href="/(app)" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl font-bold text-red-500 mb-4">
        Bienvenue sur Pizza App!
      </Text>
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="bg-red-500 py-2 px-4 rounded-md">
          <Text className="text-white font-bold">Se connecter</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}