import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {fetchPosts} from '../services/api';

export default function HomeScreen({
  navigation,
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [error, setError] =
    useState('');

  async function loadPosts() {
    try {
      setError('');

      const data = await fetchPosts();

      setPosts(data.slice(0, 20));
    } catch (error) {
      setError(
        'Unable to load posts. Please try again.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function refresh() {
    setRefreshing(true);
    loadPosts();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          CAPSTONE
        </Text>

        <Text style={styles.subtitle}>
          Explore latest posts
        </Text>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading API data...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadPosts}>
            <Text style={styles.retryText}>
              TRY AGAIN
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item =>
            String(item.id)
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
            />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate(
                  'Detail',
                  {item},
                )
              }>
              <Text style={styles.number}>
                #{item.id}
              </Text>

              <Text
                style={styles.cardTitle}>
                {item.title}
              </Text>

              <Text
                style={styles.body}
                numberOfLines={3}>
                {item.body}
              </Text>

              <Text style={styles.read}>
                View details →
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },

  header: {
    paddingVertical: 15,
    marginBottom: 5,
  },

  logo: {
    fontSize: 28,
    fontWeight: '900',
  },

  subtitle: {
    color: '#666666',
    marginTop: 4,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  error: {
    textAlign: 'center',
    color: '#b00020',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 8,
  },

  retryText: {
    color: '#ffffff',
    fontWeight: '800',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 17,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  number: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    textTransform: 'capitalize',
    marginBottom: 8,
  },

  body: {
    color: '#555555',
    lineHeight: 21,
  },

  read: {
    marginTop: 12,
    fontWeight: '700',
  },
});