const ADDRESS = process.env.DEV_ADDRESS;

/**
 * Update customer's balance by deducting a specified amount
 * @param {string} customerId - ID of the customer
 * @param {string} token - Access token for authentication
 * @param {number} currentBalance - Current balance of the customer
 * @param {number} amountToDeduct - Amount to deduct from the balance
 * @returns {Promise<any>}
 */
export async function updateCustomerBalance(
  customerId: string,
  token: string,
  currentBalance: number,
  amountToDeduct: number
): Promise<any> {
  const updatedBalance = currentBalance - amountToDeduct;

  try {
    const response = await fetch(`${ADDRESS}:1337/v1/customer/${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      method: 'PUT',
      body: JSON.stringify({ balance: updatedBalance })
    });

    if (response.status === 204) {
      // Successful "No Content" response
      console.log('User updated successfully');
      return response.status;
    } else {
      console.log('Failure in response');
      throw new Error('Data not found in the put customer response');
    }
  } catch (error) {
    console.error('Put customer error:', error);
    throw new Error('Put customer error: ' + (error as Error).message);
  }
}

type getCustomerResponse = {
  id: number;
  name: string;
  email: string;
  positionX: number;
  positionY: number;
  balance: number;
};

/**
 *
 * @param {string} customerId
 * @returns {getCustomerResponse}
 */
export async function getCustomer(
  customerId: string,
  token: string
): Promise<getCustomerResponse> {
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/customer/${customerId}`, {
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
      throw new Error(' customer Data not found in the response');
    }
  } catch (error) {
    console.error('error getting customer');
    throw new Error('error getting customer: ' + (error as Error).message);
  }
}

export async function postCustomerToken(
  emailBody: string,
): Promise<getCustomerResponse> {
  try {
    const response = await fetch(`${ADDRESS}:1337/v1/customer/token`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: emailBody
      })
    });
    const result = await response.json();
    if (result && result.data) {
      return result;
    } else {
      throw new Error(' customer post data not found in the response');
    }
  } catch (error) {
    console.error('error posting customer token');
    throw new Error('error posting customer token: ' + (error as Error).message);
  }
}