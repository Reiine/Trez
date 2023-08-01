import axios from 'axios';

export async function numberCartItems(authToken) {
  try {
    const response = await axios.post(
      'http://localhost:3001/number-of-items',
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const cartValue = response.data.value;
    return cartValue;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return 0;
    } else {
      console.error('Error fetching cart items:', error);
      throw error; 
    }
  }
}
