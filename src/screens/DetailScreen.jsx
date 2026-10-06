import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import {
  getFavorites,
  toggleFavorite,
} from '../services/storage';

export default function DetailScreen({
  route,
  navigation,
}) {
  const {item} = route.params;

  const [favorite, setFavorite] =
    useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  async function checkFavorite() {
    const favorites =
      await getFavorites();

    setFavorite(
      favorites.some(
        favoriteItem =>
          favoriteItem.id === item.id,
      ),
    );
  }

  async function handleFavorite() {
    try {
      const updated =
        await toggleFavorite(item);

      const isFavorite =
        updated.some(
          favoriteItem =>
            favoriteItem.id === item.id,
        );

      setFavorite(isFavorite);

      Alert.alert(
        isFavorite
          ? 'Favorite Added'
          : 'Favorite Removed',
        isFavorite
          ? 'Item saved to favorites.'
          : 'Item removed from favorites.',
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to update favorite.',
      );
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Pressable
        style={styles.back}
        onPress={() =>
          navigation.goBack()
        }>
        <Text style={styles.backText}>
          ← Back
        </Text>
      </Pressable>

      <Text style={styles.id}>
        ITEM #{item.id}
      </Text>

      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.body}>
        {item.body}
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Post Information
        </Text>

        <Text style={styles.infoText}>
          User ID: {item.userId}
        </Text>

        <Text style={styles.infoText}>
          Post ID: {item.id}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleFavorite}>
        <Text style={styles.buttonText}>
          {favorite
            ? '★ REMOVE FAVORITE'
            : '☆ ADD TO FAVORITES'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    padding: 24,
  },

  back: {
    marginBottom: 30,
  },

  backText: {
    fontSize: 17,
    fontWeight: '700',
  },

  id: {
    color: '#777777',
    fontWeight: '700',
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'capitalize',
    marginBottom: 22,
  },

  body: {
    fontSize: 17,
    lineHeight: 28,
    color: '#444444',
  },

  infoCard: {
    marginTop: 30,
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 12,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },

  infoText: {
    marginBottom: 5,
    color: '#555555',
  },

  button: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});