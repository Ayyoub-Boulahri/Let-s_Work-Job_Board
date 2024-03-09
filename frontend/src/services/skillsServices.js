import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

const searchSkills = async (searchString = '') => {
  if (searchString.trim().length < 2) {
    return null;
  }

  try {
    const response = await axios.get(`${SERVERPOINT}/api/skills/searchSkills/${searchString}`, { withCredentials: true });

    if (response.status === 200) {
      return response.data.skills;
    } else {
      console.error('Failed to fetch skills:', response.data.error);
    }
  } catch (error) {
    console.error('Error during fetching skills', error);
  }

  return null;
};

export default searchSkills;
