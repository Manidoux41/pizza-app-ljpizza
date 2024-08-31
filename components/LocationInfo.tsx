import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import * as Location from 'expo-location';

export default function LocationInfo() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <Animated.View 
      className="mt-4 bg-pizza-yellow p-3 rounded-md"
      style={{ opacity: animation }}
    >
      <Text className="text-center text-pizza-red font-bold font-pizza">{text}</Text>
    </Animated.View>
  );
}