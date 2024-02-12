import axios from 'axios';

const getAllCountries = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/countries', {withCredentials: true});

    if (response.status === 200) {
      return response.data.countries;
    } else {
      console.error('Failed to fetch authentication status:', response.data.error);
    }
  } catch (error) {
    console.error('Error during fetching countries:', error);
  }

  return null;
};

export default getAllCountries;