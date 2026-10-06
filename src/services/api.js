const API_URL =
  'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      'Unable to fetch data from API.',
    );
  }

  const data = await response.json();

  return data;
}