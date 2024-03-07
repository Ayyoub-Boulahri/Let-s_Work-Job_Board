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
        const response = await axios.post('http://localhost:5000/api/notifications/employeeNotifications', { employeeId }, { withCredentials: true });
        if (response.status === 200)
            return response.data.notifications;
    } catch (error) {
        throw error;
    }
};

export const getCompanyNotifications = async (companyId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/notifications/companyNotifications', { companyId }, { withCredentials: true });
        if (response.status === 200)
            return response.data.notifications;
    } catch (error) {
        throw error;
    }
};

export const changeNotificationStatus = async (notificationId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/notifications/changeNotificationStatus', { notificationId }, { withCredentials: true });
        if (response.status === 200)
            return response;
    } catch (error) {
        throw error;
    }
}