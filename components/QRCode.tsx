import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QRCodeProps = {
  value: string;
};

export default function QRCodeComponent({ value }: QRCodeProps) {
  if (!value) {
    return (
      <View className="items-center justify-center my-4">
        <Text className="text-pizza-red font-pizza">QR Code non disponible</Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center my-4">
      <QRCode
        value={value}
        size={200}
        color="#FF0000"
        backgroundColor="#FFFFFF"
      />
    </View>
  );
}