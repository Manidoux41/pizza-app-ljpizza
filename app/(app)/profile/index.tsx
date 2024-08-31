import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter, Link } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

export default function Profile() {
  const { profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
    }
  };

  if (!profile) {
    return <View><Text>Chargement...</Text></View>;
  }

  const pizzasUntilFree = 10 - (profile.pizzas_bought % 10);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-red-500">Votre Profil</Text>
      <Text className="mb-2">Nom: {profile.first_name} {profile.last_name}</Text>
      <Text className="mb-2">Email: {profile.email}</Text>
      <Text className="mb-2">Localisation: {profile.location}</Text>
      <Text className="mb-2">Pizzas achetées: {profile.pizzas_bought}</Text>
      <Text className="mb-2">Pizzas restantes avant la prochaine gratuite: {pizzasUntilFree}</Text>
      <Text className="mb-4">Pizzas gratuites gagnées: {profile.free_pizzas_earned}</Text>
      
      <Text className="text-lg font-bold mb-2">Votre QR Code:</Text>
      <View className="items-center justify-center my-4">
        <QRCode
          value={profile.id}
          size={200}
          color="#FF0000"
          backgroundColor="#FFFFFF"
        />
      </View>
      
      <TouchableOpacity
        className="bg-red-500 py-2 px-4 rounded-md mb-4"
        onPress={handleSignOut}
      >
        <Text className="text-white font-bold text-center">Se déconnecter</Text>
      </TouchableOpacity>
      
      <Link href="/LegalMentions" asChild>
        <TouchableOpacity>
          <Text className="text-blue-500 text-center">Mentions légales</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}