import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@capstone_users';
const FAVORITES_KEY = '@capstone_favorites';

export async function getUsers() {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.log('Get users error:', error);
    return [];
  }
}

export async function signupUser(user) {
  const users = await getUsers();

  const existingUser = users.find(
    item =>
      item.email.toLowerCase() ===
      user.email.toLowerCase(),
  );

  if (existingUser) {
    throw new Error(
      'An account with this email already exists.',
    );
  }

  const updatedUsers = [
    ...users,
    {
      id: Date.now().toString(),
      username: user.username,
      email: user.email,
      password: user.password,
    },
  ];

  await AsyncStorage.setItem(
    USERS_KEY,
    JSON.stringify(updatedUsers),
  );

  return user;
}

export async function loginUser(email, password) {
  const users = await getUsers();

  const user = users.find(
    item =>
      item.email.toLowerCase() ===
        email.toLowerCase() &&
      item.password === password,
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  return user;
}

export async function getFavorites() {
  try {
    const data =
      await AsyncStorage.getItem(FAVORITES_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.log('Get favorites error:', error);
    return [];
  }
}

export async function toggleFavorite(item) {
  const favorites = await getFavorites();

  const exists = favorites.some(
    favorite => favorite.id === item.id,
  );

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter(
      favorite => favorite.id !== item.id,
    );
  } else {
    updatedFavorites = [
      ...favorites,
      item,
    ];
  }

  await AsyncStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites),
  );

  return updatedFavorites;
}
