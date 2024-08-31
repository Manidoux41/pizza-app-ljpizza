import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

type AuthFormProps = {
  onSubmit: (email: string, password: string, firstName: string, lastName: string, location: string) => void;
  isLogin: boolean;
};

export default function AuthForm({ onSubmit, isLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    onSubmit(email, password, firstName, lastName, location);
  };

  return (
    <View className="w-full px-4">
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
      {!isLogin && (
        <>
          <TextInput
            className="border-2 border-pizza-yellow rounded-md p-3 mb-4 bg-pizza-white text-pizza-red font-pizza"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="border-2 border-pizza-yellow rounded-md p-3 mb-4 bg-pizza-white text-pizza-red font-pizza"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            className="border-2 border-pizza-yellow rounded-md p-3 mb-4 bg-pizza-white text-pizza-red font-pizza"
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </>
      )}
      <TouchableOpacity
        className="bg-pizza-red rounded-md p-3"
        onPress={handleSubmit}
      >
        <Text className="text-pizza-white text-center font-bold font-pizza">
          {isLogin ? "Login" : "Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}