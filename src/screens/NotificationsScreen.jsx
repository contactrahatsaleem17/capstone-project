import React, {useState} from 'react';

import {
  View,
  Text,
  Switch,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  sendTestNotification,
} from '../services/notifications';

export default function NotificationsScreen() {
  const [enabled, setEnabled] =
    useState(true);

  async function handleTestNotification() {
    if (!enabled) {
      Alert.alert(
        'Notifications Disabled',
        'Please enable notifications first.',
      );

      return;
    }

    try {
      await sendTestNotification();

      Alert.alert(
        'Notification Sent',
        'The test notification was triggered successfully.',
      );
    } catch (error) {
      Alert.alert(
        'Notification Error',
        'Unable to send notification.',
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notifications
      </Text>

      <Text style={styles.subtitle}>
        Configure and test app notifications.
      </Text>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.label}>
            Enable Notifications
          </Text>

          <Text style={styles.description}>
            Allow notification alerts
          </Text>
        </View>

        <Switch
          value={enabled}
          onValueChange={setEnabled}
        />
      </View>

      <View style={styles.configure}>
        <Text style={styles.configureTitle}>
          Notification Configuration
        </Text>

        <Text>
          Permission:{' '}
          {enabled
            ? 'Enabled'
            : 'Disabled'}
        </Text>

        <Text>
          Channel: default
        </Text>

        <Text>
          Alert type: Local notification
        </Text>

        <Text>
          Provider: Notifee
        </Text>
      </View>

      <Pressable
        style={[
          styles.button,
          !enabled && styles.disabledButton,
        ]}
        onPress={handleTestNotification}>
        <Text style={styles.buttonText}>
          TRIGGER TEST NOTIFICATION
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
  },

  subtitle: {
    color: '#666666',
    marginTop: 5,
    marginBottom: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  rowText: {
    flex: 1,
    paddingRight: 15,
  },

  label: {
    fontSize: 17,
    fontWeight: '700',
  },

  description: {
    color: '#777777',
    marginTop: 4,
  },

  configure: {
    marginTop: 25,
    padding: 18,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },

  configureTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#222222',
    padding: 17,
    borderRadius: 10,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});