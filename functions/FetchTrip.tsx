const ADDRESS = process.env.DEV_ADDRESS;
import { retrieveToken } from './SecureStore';

type GetTripReturn = {
  data: {
    id: number;
    customerId: number;
    scooterId: number;
    bestParkingZone: number;
    bestPickupZone: number;
    parkedCharging: boolean;
    timeStarted: string;
    timeEnded: string;
    distance: number;
    route: [number, number][];
    priceInitial: number;
    priceTime: number;
    priceDistance: number;
  };
};

type PostTripReturn = {
  data: {
    tripId: number;
  };
};

type ApiResponse = {
  status: string;
  message: string;
};

/**
 *
 * @param {string} tripId
 * @returns {GetTripReturn}
 */
export async function getTrip(tripId: string): Promise<GetTripReturn> {
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/trip/${tripId}`);
    const result = await response.json();
    if (result && result.data) {
      return result;
    } else {
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('error getting trip');
    throw new Error('error getting trip: ' + (error as Error).message);
  }
}

/**
 * Not done yet in progress
 * @param {string} token
 * @param {number} tripId
 * @param {number} customerId
 * @param {number} scooterId
 * @param {number} scooterPos
 * @returns {PostTripReturn}
 */
export async function postTrip(
  token: string,
  tripId: number = 0,
  customerId: number,
  scooterId: number,
  scooterPos: Array<number>
): Promise<PostTripReturn> {
  //const token = await retrieveToken('ScooterToken'); // getting token here doesn't work fix it later
  console.log(customerId);
  console.log(scooterId);
  console.log(token);
  const tripString = tripId.toString();
  console.log('tripstring: ', tripString);
  console.log('add: ', ADDRESS);
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/trip/0`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'POST',
      body: JSON.stringify({
        customerId: 10002,
        scooterId: 4,
        startPosition: scooterPos
      })
    });
    if (response.status === 403) {
      console.log(token);
      throw new Error(
        'Access forbidden: Check your permissions or credentials.'
      );
    }
    const result = await response.json(); // sätt customer id scooter id och mer se postemaneee
    if (result && result.data) {
      return result.data;
    } else {
      console.log('Res returned empty');
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('postTrip error:', error);
    throw new Error('Error during postTrip: ' + (error as Error).message);
  }
}

/**
 * recheck later
 * @param {string} tripId
 * @returns {Promise<any>}
 */
export async function putTrip(tripId: string, token): Promise<any> {
  const tripId2 = String(tripId);
  const currentDate = new Date().toISOString();
  console.log('current date: ', currentDate);
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/trip/${tripId2}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'PUT',
      body: JSON.stringify({ timeEnded: currentDate })
    });

    if (response.status === 204) {
      // Successful "No Content" response
      console.log('trip updated successfully');
      return response.status;
    }

    if (response.status !== 204) {
      console.log('Failure in response');
    } else {
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error('putScooter error:', error);
    throw new Error('putScooter error: ' + (error as Error).message);
  }
}
