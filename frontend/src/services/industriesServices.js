import axios from 'axios';

const getAllIndustries = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/industries', {withCredentials: true});

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