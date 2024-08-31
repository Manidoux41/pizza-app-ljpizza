import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated } from 'react-native';

type AuthFormProps = {
  onSubmit: (email: string, password: string) => void;
  isLogin: boolean;
};

export default function AuthForm({ onSubmit, isLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      className="w-full px-4"
      style={{
        transform: [{ scale: animation }],
      }}
    >
      <TextInput
        className="border-2 border-pizza-yellow rounded-md p-3 mb-4 bg-pizza-white text-pizza-red font-pizza"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border-2 border-pizza-yellow rounded-md p-3 mb-4 bg-pizza-white text-pizza-red font-pizza"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className="bg-pizza-red rounded-md p-3"
        onPress={() => onSubmit(email, password)}
      >
        <Text className="text-pizza-white text-center font-bold font-pizza">
          {isLogin ? "Login" : "Register"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}