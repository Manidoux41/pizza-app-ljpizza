import React from 'react';
import { View, Text, Animated } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function PizzaCounter() {
  const { user } = useAuth();
  const pizzasBought = user?.pizzas_bought || 0;
  const freePizzasEarned = user?.free_pizzas_earned || 0;
  const pizzasUntilFree = 9 - (pizzasBought % 9);

  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      className="bg-pizza-white p-4 rounded-md shadow-md mb-4 border-2 border-pizza-yellow"
      style={{ transform: [{ scale: animation }] }}
    >
      <Text className="text-lg font-bold mb-2 text-pizza-red font-pizza">Pizza Counter</Text>
      <Text className="text-pizza-red font-pizza">Pizzas bought: {pizzasBought}</Text>
      <Text className="text-pizza-red font-pizza">Free pizzas earned: {freePizzasEarned}</Text>
      <Text className="text-pizza-red font-pizza">Pizzas until next free one: {pizzasUntilFree}</Text>
    </Animated.View>
  );
}