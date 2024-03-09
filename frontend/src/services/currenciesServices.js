import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

const getAllCurrencies = async () => {
    try {
        const response = await axios.get(SERVERPOINT + '/api/currencies/', {withCredentials: true})
        if(response.status === 200)
            return response.data.currencies
    } catch (error) {
        console.error(error)
        throw error;
    }
};

export default getAllCurrencies;
