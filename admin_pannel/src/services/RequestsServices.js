import axios from 'axios';
import { SERVERPOINT } from './variables';


export const getTotalRequests = async (searchTxt, filters) => {
    try {
        const response = await axios.post(SERVERPOINT + "/api/companies/totalRequest", { searchTxt, filters }, { withCredentials: true });
        if (response.status === 200) {
            return response.data.totalCompanies;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSomeCompanies = async (project, skip, limit, searchTxt, filters) => {
    try {
        const response = await axios.post(SERVERPOINT + "/api/companies/getSomeCompanies", { project, skip, limit, searchTxt, filters }, { withCredentials: true });
        if (response.status === 200)
            return response.data.companies;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const updateCompanyInfos = async (_id, infos) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/companies/update/companyInfos', { _id, infos }, { withCredentials: true })
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.error('Error updating company infos:', error);
        throw error;
    }
}




