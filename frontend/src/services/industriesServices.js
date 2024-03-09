import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

const getAllIndustries = async () => {
  try {
    const response = await axios.get(SERVERPOINT + '/api/industries', {withCredentials: true});

    if (response.status === 200) {
      return response.data.industries;
    } else {
      console.error('Failed to fetch authentication status:', response.data.error);
    }
  } catch (error) {
    console.error('Error during fetching industries', error);
  }

  return null;
};

export default getAllIndustries;