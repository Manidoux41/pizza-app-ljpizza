import 'react-native-url-polyfill/auto';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import { ExpoRoot } from 'expo-router';

export default function App() {
  const ctx = require.context('./app');

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ExpoRoot context={ctx} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}