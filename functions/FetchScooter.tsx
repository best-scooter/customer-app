const ADDRESS = process.env.DEV_ADDRESS;

// for handling tokens
import { retrieveToken, storeToken } from './SecureStore';

type GetScooterResponse = {
  data: {
    id: number;
    positionX: number;
    positionY: number;
    battery: number;
    max_speed: number;
    charging: boolean;
    available: boolean;
    decomissioned: boolean;
    beingServiced: boolean;
    disabled: boolean;
    connected: boolean;
  };
};

type GetScooterToken = {
  token: string;
  scooterId: number;
};

/**
 *
 * @param {string} scooterId - scooters id
 * @returns {GetScooterResponse}
 */
export async function getScooter(
  scooterId: string
): Promise<GetScooterResponse> {
  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/scooter/${scooterId}`);
    const result = await response.json();
    if (result && result.data) {
      return result.data;
    } else {
      //console.log('Data not found in the response');
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('Get scooter:', error);
    throw new Error('Get scooter: ' + (error as Error).message);
  }
}

/**
 *
 * @param {string} token - customer token
 * @returns {GetScooterResponse}
 */
export async function getAllScooters(
  token: string
): Promise<GetScooterResponse> {
  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/scooter`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'GET'
    });
    const result = await response.json();
    if (result && result.data) {
      return result.data;
    } else {
      //console.log('Data not found in the response');
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('GetAll scooter:', error);
    throw new Error('GetAll scooterr: ' + (error as Error).message);
  }
}

/**
 *
 * @param  {string} scooterId - scooters id token
 * @returns {GetScooterToken}
 */
export async function getScooterToken(
  scooterId: string
): Promise<GetScooterToken> {
  // making sure they're correctly typed
  const scootId = parseInt(scooterId);
  const pass = String(scootId);

  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/scooter/token`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ scooterId: scootId, password: pass })
    });
    const result = await response.json();
    if (result && result.data) {
      storeToken('ScooterToken', result.data.token);
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

/**
 *
 * @param {string} scooterId - scooters id
 * @param {string} token - scooters tokrn
 * @param {boolean} status - true or false for available attribute
 * @returns {number}
 */
export async function putScooter(
  scooterId: string,
  token: string,
  status: boolean
): Promise<number> {
  //const token = await retrieveToken("ScooterToken")
  const scooterId2 = String(scooterId);
  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/scooter/${scooterId2}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'PUT',
      body: JSON.stringify({ available: false })
    });

    if (response.status === 204) {
      // Successful "No Content" response
      console.log('Scooter availability updated successfully');
      return response.status;
    } else {
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('putScooter error:', error);
    throw new Error('putScooter error: ' + (error as Error).message);
  }
}
