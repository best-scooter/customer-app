const ADDRESS = process.env.DEV_ADDRESS;
import * as WebBrowser from 'expo-web-browser';
import { extractCodeFromUrl } from './Helpers';

type postTokenResponse = {
  data: {
    token: string;
    email: string;
    customerId: number;
  };
};

export async function getOAUTH(): Promise<string[]> {
  try {
    const response = await fetch(
      `${ADDRESS}:1337/customer/auth?redirectUrl=exp://192.168.0.10:8081&mobile=true`
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
    const url = result.url //lint err, not actual error..
    const code = extractCodeFromUrl(url);

    //console.log('Code:', code);

    return [code, state];
  } catch (error) {
    console.error('OAuth error:', error);
    throw new Error('Error during OAuth: ' + (error as Error).message);
  }
}

export async function postOAUTH(code: string, state: string): Promise<string> {
  try {
    const response = await fetch(`${ADDRESS}:1337/customer/auth?mobile=true`, {
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
    throw new Error('Error during OAuth: ' + (error as Error).message);
  }
}

export async function postToken(
  oAuthToken: string,
  email: string = 'standard.gmail.com'
): Promise<postTokenResponse> {
  try {
    const response = await fetch(`${ADDRESS}:1337/customer/token`, {
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

const getStations = async () => {
  const response = await fetch(
    'http://192.168.0.10:1337/customer/auth?redirectUrl=exp://192.168.0.10:8081&mobile=true'
  );
  const result = await response.json();
  const state = result.data.state;
  //console.log(result)
  return result;
};
