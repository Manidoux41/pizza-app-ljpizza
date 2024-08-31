import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const router = useRouter();
  const { signUp } = useAuth();

  const handleRegister = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      router.replace('/(app)/user/home');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show message to user)
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-pizza-white p-4">
      <Image source={require('../../assets/images/logo.png')} className="w-40 h-40 mb-6" />
      <Text className="text-2xl font-bold mb-6 text-pizza-red font-pizza">Pizza App Register</Text>
      <AuthForm onSubmit={handleRegister} isLogin={false} />
    </View>
  );
}