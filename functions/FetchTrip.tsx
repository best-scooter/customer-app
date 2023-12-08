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
 * @param tripId string
 * @returns data of type
 */
export async function getTrip(tripId: string): Promise<GetTripReturn> {
  try {
    const response = await fetch(`${ADDRESS}:1337/trip/${tripId}`);
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

export async function postTrip(
  tripId: number = 0,
  customerId: number,
  scooterId: number
): Promise<PostTripReturn> {
  const token = await retrieveToken('ScooterToken');
  try {
    const response = await fetch(`${ADDRESS}:1337/trip/${tripId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'POST',
      body: JSON.stringify({})
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

export async function putTrip(tripId: string): Promise<ApiResponse> {
  const token = await retrieveToken('ScooterToken');
  const tripId2 = String(tripId);
  try {
    const response = await fetch(`${ADDRESS}:1337/trip/${tripId2}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'PUT',
      body: JSON.stringify({})
    });

    if (response.status === 204) {
      // Successful "No Content" response
      console.log('Scooter availability updated successfully');
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
