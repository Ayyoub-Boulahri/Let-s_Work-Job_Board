import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

const handleLogout = async () => {
    try {
        await axios.get(SERVERPOINT + '/api/login/logout', { withCredentials: true });
        // Redirect or perform additional actions after successful logout
        console.log('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default handleLogout;