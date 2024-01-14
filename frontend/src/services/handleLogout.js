import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.get('http://localhost:5000/api/login/logout', { withCredentials: true });
        // Redirect or perform additional actions after successful logout
        console.log('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default handleLogout;