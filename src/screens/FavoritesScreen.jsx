import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  getFavorites,
} from '../services/storage';

export default function FavoritesScreen({
  navigation,
}) {
  const [favorites, setFavorites] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  async function loadFavorites() {
    const data =
      await getFavorites();

    setFavorites(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Favorites
      </Text>

      <Text style={styles.subtitle}>
        Your saved items
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={item =>
          String(item.id)
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No favorites saved yet.
          </Text>
        }
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                'Detail',
                {item},
              )
            }>
            <Text style={styles.itemTitle}>
              {item.title}
            </Text>

            <Text
              style={styles.body}
              numberOfLines={3}>
              {item.body}
            </Text>

            <Text style={styles.storage}>
              ✓ Saved in AsyncStorage
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
  },

  subtitle: {
    color: '#666666',
    marginTop: 5,
    marginBottom: 20,
  },

  empty: {
    marginTop: 20,
    color: '#666666',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 17,
    borderRadius: 12,
    marginBottom: 12,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: '800',
    textTransform: 'capitalize',
    marginBottom: 8,
  },

  body: {
    color: '#555555',
    lineHeight: 20,
  },

  storage: {
    marginTop: 12,
    fontWeight: '700',
    fontSize: 12,
  },
});
