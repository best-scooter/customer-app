const ADDRESS = process.env.DEV_ADDRESS;

export async function getParkingByScooter(
  customerToken: string,
  scooterId: any
): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  try {
    const response = await fetch(
      `http://${ADDRESS}:1337/v1/parking/by/scooter/${scooterId}`,
      {
        headers: {
          'Content-Type': 'Application/json',
          'X-Access-Token': customerToken
        },
        method: 'GET'
      }
    );
    const res = await response.json();
    if (res) {
      return res;
    } else {
      throw new Error('Data not found in the response get parking by id');
    }
  } catch (error) {
    console.error(error);
    throw new Error('get parking by id error: ' + (error as Error).message);
  }
}

export async function postParkingByScooter(
  customerToken: string,
  scooterId: any,
  scooterPos: string[]
): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  console.log('in func scooter pos : ', scooterPos);
  console.log('in func scooter id : ', scooterId);
  console.log('in func customer token : ', customerToken);

  const scooterStringId = scooterId.toString();
  console.log(JSON.stringify({
    scooterPosition: scooterPos
  }))

  try {
    const response = await fetch(
      `http://${ADDRESS}:1337/v1/parking/by/scooter/${scooterStringId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': customerToken
        },
        method: 'POST',
        body: JSON.stringify({
          scooterPosition: scooterPos
        })
      }
    );
    const res = await response.json();
    console.log('response from post parking by id:' , res)
    if (res) {
      return res.data;
    } else {
      throw new Error('Data not found in the response post parking by id');
    }
  } catch (error) {
    console.error(error);
    throw new Error('post parking by id error: ' + (error as Error).message);
  }
}
