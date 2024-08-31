import 'react-native-url-polyfill/auto';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import { setupNotifications } from './services/notificationService';
import { ExpoRoot } from 'expo-router';

// Ignore specific LogBox warnings if needed
LogBox.ignoreLogs(['Warning: ...']); // Ignore specific logs if needed

export default function App() {
  const [fontsLoaded] = useFonts({
    'PizzaFont': require('./assets/fonts/SUSE-Regular.ttf'),
  });

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const ctx = require.context('./app');

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <ExpoRoot context={ctx} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}