import React from 'react';
import { View, Animated } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QRCodeProps = {
  value: string;
};

export default function QRCodeComponent({ value }: QRCodeProps) {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      className="items-center justify-center my-4"
      style={{ transform: [{ scale: animation }] }}
    >
      <QRCode
        value={value}
        size={200}
        color="#FF0000"
        backgroundColor="#FFFFFF"
      />
    </Animated.View>
  );
}