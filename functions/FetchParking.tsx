const ADDRESS = process.env.DEV_ADDRESS;

export async function getParkingByScooter(customerToken: string, scooterId: any): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/parking/by/scooter/${scooterId}`, {
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
      throw new Error('Data not found in the response get parking by id');
    }
  } catch (error) {
    console.error(error);
    throw new Error('get parking by id error: ' + (error as Error).message);
  }
}

export async function postParkingByScooter(customerToken: string, scooterId: any, scooterPos: string[]): Promise<GetZonesReturn> {
  //const customerToken = retrieveToken('jwtLogin')
  console.log('in func scooter pos : ', scooterPos)
  console.log('in func scooter id : ', scooterId)
  console.log('in func customer token : ', customerToken)

  const scooterStringId = scooterId.toString() 

  try {
    const response = await fetch(`http://${ADDRESS}:1337/v1/parking/by/scooter/${scooterStringId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJhZG1pblVzZXJuYW1lIjoiY2hlZmVuIiwiYWRtaW5MZXZlbCI6InN1cGVyYWRtaW4iLCJpZCI6MSwiYWRtaW5JZCI6MSwiaWF0IjoxNzA0OTQ5MTM2LCJleHAiOjE3MDQ5NjM1MzZ9.CVEmaEqzl5e3DsHkB6XCUbtMsk-ErUPZHeJm3_UMY1Y"
      },
      method: 'POST',
      body: JSON.stringify({
        scooterPosition: [57.69, 11.95]
      })
    });
    const res = await response.json();
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