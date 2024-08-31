import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LegalMentions() {
  const router = useRouter();

  return (
    <View className="mt-4">
      <TouchableOpacity 
        className="bg-pizza-yellow p-2 rounded-md"
        onPress={() => router.push('/legal')}
      >
        <Text className="text-pizza-red text-center font-bold font-pizza">Legal Mentions</Text>
      </TouchableOpacity>
    </View>
  );
}