import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import QRCode from 'react-native-qrcode-svg';

export default function Home() {
  const { profile } = useAuth();

  if (!profile) {
    return <View><Text>Chargement...</Text></View>;
  }

  const pizzasUntilFree = 10 - (profile.pizzas_bought % 10);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4 text-red-500 font-pizza">
        Bienvenue, {profile.first_name || 'Pizzaïolo'}!
      </Text>
      <View className="mb-4">
        <Text className="text-red-500 font-pizza mb-2">
          Pizzas achetées : {profile.pizzas_bought || 0}
        </Text>
        <Text className="text-red-500 font-pizza mb-2">
          Pizzas restantes avant la prochaine gratuite : {pizzasUntilFree}
        </Text>
        <Text className="text-red-500 font-pizza mb-2">
          Pizzas gratuites obtenues : {profile.free_pizzas_earned || 0}
        </Text>
      </View>
      <Text className="text-red-500 font-pizza mb-4">
        Voici votre QR code personnel :
      </Text>
      {profile.id && (
        <View className="items-center justify-center my-4">
          <QRCode
            value={profile.id}
            size={200}
            color="#FF0000"
            backgroundColor="#FFFFFF"
          />
        </View>
      )}
    </ScrollView>
  );
}