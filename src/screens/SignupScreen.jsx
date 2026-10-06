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

import {signupUser} from '../services/storage';

export default function SignupScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup() {
    if (!username || !email || !password) {
      Alert.alert(
        'Signup Error',
        'All fields are required.',
      );

      return;
    }

    if (!email.includes('@')) {
      Alert.alert(
        'Signup Error',
        'Please enter a valid email address.',
      );

      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Signup Error',
        'Password must contain at least 6 characters.',
      );

      return;
    }

    try {
      await signupUser({
        username,
        email,
        password,
      });

      Alert.alert(
        'Success',
        'Account created successfully.',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('Login'),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Signup Error',
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
          Create Account
        </Text>

        <Text style={styles.label}>
          Username
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />

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
          onPress={handleSignup}>
          <Text style={styles.buttonText}>
            SIGN UP
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate('Login')
          }>
          <Text style={styles.link}>
            Already have an account? Login
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
    marginBottom: 10,
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
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