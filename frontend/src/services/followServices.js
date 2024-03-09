import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

export const followCompany = async (company_id, employee_id) => {
    try {
        const followCompanyResponse = await axios.put(SERVERPOINT + "/api/employees/follow/addFollowing", { company_id, employee_id });
        const followEmployeeResponse = await axios.put(SERVERPOINT + "/api/companies/follow/addFollower", { company_id, employee_id });

        if (followCompanyResponse.status === 200 && followEmployeeResponse.status === 200)
            return "Follow successful";
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const unfollowCompany = async (company_id, employee_id) => {
    try {
        const unfollowCompanyResponse = await axios.put(SERVERPOINT + "/api/employees/follow/removeFollowing", { company_id, employee_id });
        const unfollowEmployeeResponse = await axios.put(SERVERPOINT + "/api/companies/follow/removeFollower", { company_id, employee_id });

        if (unfollowCompanyResponse.status === 200 && unfollowEmployeeResponse.status === 200)
            return "Unfollow successful";
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const isFollower = async (company_id, employee_id) => {
    try {
        const isFollowerResponse = await axios.post(SERVERPOINT + "/api/companies/follow/isFollower", { company_id, employee_id });
        if (isFollowerResponse.status === 200)
            return true;
        return false
    } catch (error) {
        throw error;
    }
}