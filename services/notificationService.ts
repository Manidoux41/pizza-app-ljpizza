import * as Notifications from 'expo-notifications';

export async function schedulePizzaNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pizza gratuite bientôt disponible !",
      body: "Vous allez bientôt obtenir une pizza gratuite !",
    },
    trigger: null,
  });
}

export async function setupNotifications() {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}