import * as SecureStore from 'expo-secure-store';

// Storing token
/**
 *
 * @param tokenName key
 * @param token value
 */
export async function storeToken(tokenName: string, token: any) {
  try {
    //console.log('token received was: ', token)
    await SecureStore.setItemAsync(tokenName, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
}

// Getting token
/**
 *
 * token names jwtLogin, ScooterToken]
 * @param tokenName key
 * @returns value
 */
export async function retrieveToken(tokenName: string) {
  try {
    const token = await SecureStore.getItemAsync(tokenName);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}

export async function removeToken(tokenName: string) {
  try {
    await SecureStore.deleteItemAsync(tokenName);
    console.log(`Token ${tokenName} removed successfully`);
  } catch (error) {
    console.error('Error removing token:', error);
  }
}
