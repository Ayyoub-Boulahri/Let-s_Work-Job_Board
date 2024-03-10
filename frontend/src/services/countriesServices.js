import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

const getAllCountries = async () => {
  try {
    const response = await axios.get(SERVERPOINT + '/api/countries', { withCredentials: true });

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

export const getCities = async (searchCity) => {
  if (searchCity.trim().length < 2) {
    return null;
  }

  try {
    const response = await axios.post(SERVERPOINT + '/api/countries/cities', { searchCity }, { withCredentials: true });
    if (response.status === 200)
      return response.data.cities
  } catch (error) {
    throw error;
  }
}

export const getCountriesNames = async (searchCountry) => {
  if (searchCountry.trim().length < 2) {
    return null;
  }

  try {
    const response = await axios.post(SERVERPOINT + '/api/countries/countriesNames', { searchCountry }, { withCredentials: true });
    if (response.status === 200)
      return response.data.countries
  } catch (error) {
    throw error;
  }

}

export default getAllCountries;