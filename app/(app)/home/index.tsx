import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import PizzaCounter from '../../../components/PizzaCounter';
import QRCode from '../../../components/QRCode';
import LegalMentions from '../../../components/LegalMentions';

export default function Home() {
  const { profile } = useAuth();

  return (
    <ScrollView className="flex-1 bg-pizza-white p-4">
      <Text className="text-2xl font-bold mb-4 text-pizza-red font-pizza">
        Bonjour, {profile?.first_name || 'Pizzaïolo'}
      </Text>
      <PizzaCounter />
      {profile?.id && <QRCode value={profile.id} />}
      <LegalMentions />
    </ScrollView>
  );
}