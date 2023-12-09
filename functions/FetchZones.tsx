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

export async function getZones(customerToken): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  try {
    const response = await fetch(`${ADDRESS}:1337/zone`, {
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
