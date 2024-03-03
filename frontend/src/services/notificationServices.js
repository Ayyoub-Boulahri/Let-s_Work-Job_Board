import axios from "axios";

export const getTotalUnreadNotifications = async (userId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/notifications/totalUnreadNotifications', { userId }, { withCredentials: true });
        if (response.status === 200)
            return response.data.totalNotification;
    } catch (error) {
        throw error;
    }
};

export const getEmployeeNotifications = async (employeeId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/notifications/employeeNotification', { employeeId }, { withCredentials: true });
        if (response.status === 200)
            return response.data.notifications;
    } catch (error) {
        throw error;
    }
};
