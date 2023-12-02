const ADDRESS = process.env.DEV_ADDRESS;
import * as WebBrowser from "expo-web-browser";
import { extractCodeFromUrl } from "./Helpers";

const postOAUTH = async (code:string, state:string) => {
    const response = await fetch("http://192.168.0.10:1337/customer/auth?mobile=true", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"code": code, "state": state})
      });
      const result = await response.json();
};

export async function getOAUTH(): Promise<string[]> {
    try {
        const response = await fetch(`${ADDRESS}:1337/customer/auth?redirectUrl=exp://192.168.0.10:8081&mobile=true`);
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
        throw new Error('Failed to fetch OAuth data: ' + error.message);
    }
}

export async function redirectOAuth(redirectUrl: string, url: string, state: string): Promise<string[]> {
    try {
      console.log(redirectUrl, url, state);
      const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
      const code = extractCodeFromUrl(result.url);
  
      console.log('Code:', code);
  
      // If needed, add postOAUTH logic here
      // postOAUTH(code, state);
  
      return [code, state];
    } catch (error) {
      console.error('OAuth error:', error);
      throw new Error('Error during OAuth: ' + error.message);
    }
  }

export async function postOAUTH(code: string, state: string): Promise<string> {
    try {
      //normal route doesnt work it enforces redirect to predetermined url so this is a work around
      const response = await fetch(`${ADDRESS}:1337/customer/auth?mobile=true`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"code": code, "state": state})
      });
      const result = await response.json();
      console.log(result)

      return result.oAuthToken

    } catch (error) {
        console.error('OAuth error:', error);
        throw new Error('Error during OAuth: ' + error.message);
      }
  };


const getStations = async () => {
    const response = await fetch("http://192.168.0.10:1337/customer/auth?redirectUrl=exp://192.168.0.10:8081&mobile=true");
    const result = await response.json();
    const state = result.data.state
    //console.log(result)
    return result
};