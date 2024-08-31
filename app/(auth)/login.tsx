import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import AuthForm from '../../components/AuthForm';
import LocationInfo from '../../components/LocationInfo';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      router.replace('/(app)/user/home');
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show message to user)
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-pizza-white p-4">
      <Image source={require('../../assets/images/logo.png')} className="w-40 h-40 mb-6" />
      <Text className="text-2xl font-bold mb-6 text-pizza-red font-pizza">Pizza App Login</Text>
      <AuthForm onSubmit={handleLogin} isLogin />
      <LocationInfo />
      <View className="mt-4">
        <Text className="text-pizza-red font-pizza">Pas encore de compte ?</Text>
        <Link href="/register" asChild>
          <TouchableOpacity className="mt-2">
            <Text className="text-pizza-yellow font-pizza text-center">S'inscrire</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}