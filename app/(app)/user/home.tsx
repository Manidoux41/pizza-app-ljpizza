import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import PizzaCounter from '../../../components/PizzaCounter';
import QRCode from '../../../components/QRCode';
import LegalMentions from '../../../components/LegalMentions';

export default function UserHome() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 bg-pizza-white p-4">
      <Text className="text-2xl font-bold mb-4 text-pizza-red font-pizza">
        Bonjour, {user?.first_name || 'Pizzaïolo'}
      </Text>
      <PizzaCounter />
      {user?.id && <QRCode value={user.id} />}
      <LegalMentions />
    </ScrollView>
  );
}