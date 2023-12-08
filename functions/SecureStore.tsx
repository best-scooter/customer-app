import * as SecureStore from 'expo-secure-store';

// Storing token
export async function storeToken(tokenName: string, token: string) {
  try {
    await SecureStore.setItemAsync(tokenName, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
}

// Getting token
export async function retrieveToken(tokenName: string) {
  try {
    const token = await SecureStore.getItemAsync(tokenName);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}
