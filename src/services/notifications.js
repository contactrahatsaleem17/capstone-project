import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

export async function configureNotifications() {
  try {
    await notifee.requestPermission();

    await notifee.createChannel({
      id: 'default',
      name: 'Default',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  } catch (error) {
    console.log(
      'Notification configuration error:',
      error,
    );
  }
}

export async function sendTestNotification() {
  await notifee.displayNotification({
    title: 'Capstone Test Notification',
    body:
      'Your test notification was triggered successfully.',
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
      smallIcon: 'ic_launcher',
    },
  });
}