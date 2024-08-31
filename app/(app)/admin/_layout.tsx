import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';

export default function AdminLayout() {
  const { profile } = useAuth();

  if (!profile?.is_admin) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="scanner" options={{ title: 'Scanner' }} />
      <Stack.Screen name="user-profile" options={{ title: 'User Profile' }} />
    </Stack>
  );
}