import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

export const insertSupportMessage = async (newMessage) => {
    try {
        const response = await axios.post(`${SERVERPOINT}/api/supportMessages/insertMessage`, { newMessage }, { withCredentials: true });

        if (response.status === 200)
            return true
        return false
    } catch (error) {
        console.error('Error during fetching skills', error);
        return false;
    }
};

