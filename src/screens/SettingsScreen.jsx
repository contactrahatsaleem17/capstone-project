import React, {useState} from 'react';

import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

export default function SettingsScreen({
  navigation,
}) {
  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        Settings
      </Text>

      <Text style={styles.subtitle}>
        Manage your application preferences.
      </Text>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.label}>
            Notifications
          </Text>

          <Text style={styles.description}>
            Enable application notifications
          </Text>
        </View>

        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.rowText}>
          <Text style={styles.label}>
            Dark Mode
          </Text>

          <Text style={styles.description}>
            Change application appearance
          </Text>
        </View>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>

      <Pressable
        style={styles.notificationButton}
        onPress={() =>
          navigation.navigate(
            'Notifications',
          )
        }>
        <Text style={styles.notificationText}>
          Notification Settings →
        </Text>
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>
          Application Storage
        </Text>

        <Text>
          Favorites: AsyncStorage
        </Text>

        <Text>
          User accounts: AsyncStorage
        </Text>

        <Text>
          API: JSONPlaceholder
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    padding: 22,
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
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  notificationButton: {
    marginTop: 25,
    padding: 17,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },

  notificationText: {
    fontWeight: '800',
  },

  info: {
    marginTop: 30,
    padding: 17,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },

  infoTitle: {
    fontWeight: '900',
    fontSize: 17,
    marginBottom: 10,
  },
});