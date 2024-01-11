const ADDRESS = process.env.DEV_ADDRESS;
import { retrieveToken } from './SecureStore';

type GetZonesReturn = {
  data: [
    {
      id: number;
      type: string;
      area: [number, number][];
      colour: string;
      name: string;
      description: string;
      parkingValue: number;
    }
  ];
};

/**
 *
 * @param {string} customerToken - customers login token
 * @returns
 */
export async function getZones(customerToken: string): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/zone`, {
      headers: {
        'Content-Type': 'Application/json',
        'X-Access-Token': customerToken
      },
      method: 'GET'
    });
    const res = await response.json();
    if (res) {
      return res;
    } else {
      throw new Error('Data not found in the response');
    }
  } catch (error) {
    console.error(error);
    throw new Error('posting rent error: ' + (error as Error).message);
  }
}

export async function getZoneById(customerToken: string, zoneId: any): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/zone/${zoneId}`, {
      headers: {
        'Content-Type': 'Application/json',
        'X-Access-Token': customerToken
      },
      method: 'GET'
    });
    const res = await response.json();
    if (res) {
      return res;
    } else {
      throw new Error('Data not found in the response zone by id');
    }
  } catch (error) {
    console.error(error);
    throw new Error('get zone by id error: ' + (error as Error).message);
  }
}
