const ADDRESS = process.env.DEV_ADDRESS;

// for handling tokens
import { retrieveToken, storeToken } from "./SecureStore";

type GetScooterResponse = {
  data: {
    id: number,
    positionX: number,
    positionY: number,
    battery: number,
    max_speed: number,
    charging: boolean,
    available: boolean,
    decomissioned: boolean,
    beingServiced: boolean,
    disabled: boolean,
    connected: boolean
  };
};

type GetScooterToken = {
  token: string,
  scooterId: number
}



export async function getScooter(scooterId: string): Promise<GetScooterResponse> {
    try {
        const response = await fetch(`${ADDRESS}:1337/scooter/${scooterId}`);
        const result = await response.json();
        if (result && result.data) {
          return result.data;
        } else {
          //console.log('Data not found in the response');
          throw new Error('Data not found in the response');
        }
      } catch (error) {
        console.error('posting rent error:', error);
        throw new Error('posting rent error: ' + (error as Error).message);
      }
}

export async function getScooterToken(scooterId: string): Promise<GetScooterToken> {
  // making sure they're correctly typed
  const scootId = parseInt(scooterId)
  const pass = String(scootId)

  try {
      const response = await fetch(`${ADDRESS}:1337/scooter/token`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ scooterId: scootId, password: pass  })
      });
      const result = await response.json();
      if (result && result.data) {
        storeToken('ScooterToken', result.data.token)
        return result.data;
      } else {
        //console.log('Data not found in the response');
        throw new Error('Data not found in the response');
      }
    } catch (error) {
      console.error('posting rent error:', error);
      throw new Error('posting rent error: ' + (error as Error).message);
    }
}

export async function putScooter(scooterId: string, token:string, status: boolean): Promise<number> {
  //const token = await retrieveToken("ScooterToken")
  const scooterId2 = String(scooterId)
  try {
    const response = await fetch(`${ADDRESS}:1337/scooter/${scooterId2}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": token,
      },
      method: "PUT",
      body: JSON.stringify({ available: false })
    });

    if (response.status === 204) {
      // Successful "No Content" response
      console.log('Scooter availability updated successfully');
      return response.status
    }

    if (response.status !== 204) {
      console.log("Failure in response");
    } else {
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('putScooter error:', error);
    throw new Error('putScooter error: ' + (error as Error).message);
  }
};
