import axios from "axios";
import { SERVERPOINT } from "../schemas/data";

export const getTotalNotification = async (userId, condition) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/notifications/totalUnreadNotifications', { userId, condition }, { withCredentials: true });
        if (response.status === 200)
            return response.data.totalNotification;
    } catch (error) {
        throw error;
    }
};

export const getEmployeeNotifications = async (employeeId, skip, limit) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/notifications/employeeNotifications', { employeeId, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.notifications;
    } catch (error) {
        throw error;
    }
};

export const getCompanyNotifications = async (companyId, skip, limit) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/notifications/companyNotifications', { companyId, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.notifications;
    } catch (error) {
        throw error;
    }
};

export const changeNotificationStatus = async (notificationId) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/notifications/changeNotificationStatus', { notificationId }, { withCredentials: true });
        if (response.status === 200)
            return response;
    } catch (error) {
        throw error;
    }
}