import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {configureNotifications} from './src/services/notifications';

export default function App() {
  useEffect(() => {
    configureNotifications();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <AppNavigator />
    </NavigationContainer>
  );
}