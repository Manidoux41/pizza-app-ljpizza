import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace('/(app)');
    } catch (error) {
      Alert.alert('Erreur de connexion', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-md px-4 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-md px-4 mb-6"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        className="w-full h-12 bg-red-500 rounded-md justify-center items-center"
        onPress={handleLogin}
      >
        <Text className="text-white font-bold">Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}