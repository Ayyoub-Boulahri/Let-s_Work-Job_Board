import axios from 'axios';

const getAllCurrencies = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/currencies/', {withCredentials: true})
        if(response.status === 200)
            return response.data.currencies
    } catch (error) {
        console.error(error)
        throw error;
    }
};

export default getAllCurrencies;
