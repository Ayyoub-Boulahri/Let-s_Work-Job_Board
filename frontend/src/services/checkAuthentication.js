import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

const checkAuthentication = async () => {
  try {
    const response = await axios.get(SERVERPOINT + '/api/login/check-authentication', { withCredentials: true });
    console.log(response)
    if (response.status === 200) {
      const { email, auth, typeUser, userId } = response.data;
      return { email, auth, typeUser, userId };
    } else {
      console.error('Failed to fetch authentication status:', response.data.error);
    }
  } catch (error) {
    console.error('Error during authentication check:', error);
  }

  return null;
};

export default checkAuthentication;

