import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import {loginUser} from '../services/storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert(
        'Login Error',
        'Please enter email and password.',
      );

      return;
    }

    try {
      await loginUser(email, password);

      navigation.replace('Main');
    } catch (error) {
      Alert.alert(
        'Login Error',
        error.message,
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>
          CAPSTONE
        </Text>

        <Text style={styles.title}>
          Welcome Back
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>
            LOGIN
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('Signup')
          }>
          <Text style={styles.link}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
  },

  link: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 15,
  },
});