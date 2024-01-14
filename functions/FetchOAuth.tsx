const ADDRESS = process.env.DEV_ADDRESS;
import * as WebBrowser from 'expo-web-browser';
import { extractCodeFromUrl } from './Helpers';

type PostTokenResponse = {
  data: {
    token: string;
    email: string;
    customerId: number;
  };
};

export async function getOAUTH(): Promise<string[]> {
  console.log(ADDRESS);
  try {
    const response = await fetch(
      `http://${ADDRESS}:1337/v1/customer/auth?redirectUrl=exp://192.168.0.10:8888`
    );
    const result = await response.json();

    if (result && result.data) {
      const state: string = result.data.state;
      const redirectUrl: string = result.data.redirectUrl;
      const url: string = result.data.url;

      return [redirectUrl, url, state];
    } else {
      console.log('Process Aborted');
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch OAuth data: ' + (error as Error).message);
  }
}

export async function redirectOAuth(
  redirectUrl: string,
  urlIn: string,
  state: string
): Promise<string[]> {
  try {
    const result = await WebBrowser.openAuthSessionAsync(urlIn, redirectUrl);
    // @ts-ignore
    const url = result.url; //lint err, not actual error..
    const code = extractCodeFromUrl(url);

    console.log('Code:', code);

    return [code, state];
  } catch (error) {
    console.error('OAuth error:', error);
    throw new Error('Error during redirect OAuth: ' + (error as Error).message);
  }
}

export async function postOAUTH(code: string, state: string): Promise<string> {
  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/customer/auth`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ code: code, state: state })
    });
    const result = await response.json();
    if (result && result.data) {
      return result.data.oAuthToken;
    } else {
      console.log('Res returned empty');
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('OAuth error:', error);
    throw new Error('Error during post OAuth: ' + (error as Error).message);
  }
}

export async function postToken(
  oAuthToken: string,
  email: string = 'standard.gmail.com'
): Promise<PostTokenResponse> {
  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/customer/token`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ oAuthToken, email })
    });
    const result = await response.json();
    if (result && result.data) {
      console.log('token res: ', result);
      return result;
    } else {
      console.log('Res returned empty');
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error(
      'post token error most likely youre not in production: ',
      error
    );
    throw new Error(
      'post token error most likely youre not in production: ' +
        (error as Error).message
    );
  }
}
