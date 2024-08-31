import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#FFC300',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: '#FFC300',
        },
        headerTintColor: '#FF0000',
        headerTitleStyle: {
          fontFamily: 'PizzaFont',
        },
      }}
    >
      <Tabs.Screen
        name="user/home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user/profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {user?.is_admin && (
        <Tabs.Screen
          name="admin/scanner"
          options={{
            title: 'Scanner',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="qr-code" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}