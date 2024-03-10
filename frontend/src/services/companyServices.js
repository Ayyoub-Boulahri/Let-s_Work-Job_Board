import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';
export const createCompany = async (newCompany) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/signup/newCompany', newCompany, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
}

export const getCompanyByEmail = async (email) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/companies/companyByEmail', { email }, { withCredentials: true });
        if (response.status === 200) {
            return response;
        } else {
            console.error('Failed to fetch company by email:', response.error);
        }
    } catch (error) {
        console.error('Error getting employee by email:', error);
        throw error;
    }
}

export const getAllCompanyEmails = async () => {
    try {
        const response = await axios.get(SERVERPOINT + '/api/companies/emails', { withCredentials: true });
        if (response.status === 200) {
            return response.data.emails;
        } else {
            console.error('Failed to fetch emails:', response.error);
        }
    } catch (error) {
        console.error('Error getting emails:', error);
        throw error;
    }
}

export const deleteCompanyById = async (companyId) => {
    try {
        const response = await axios.delete(SERVERPOINT + '/api/companies/deleteCompanyById', { data: { _id: companyId } }, { withCredentials: true })
        if (response.status === 200) {
            console.log("delete successfully")
            return true;
        } else {
            console.error('Failed to delete company:', response.error);
            return false
        }
    } catch (error) {
        console.error('Error deleting company:', error);
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

export const getNumberOfFollowers = async (id) => {
    try {
        const response = await axios.get(SERVERPOINT + "/api/companies/companyFollowersNumber/?id=" + id, { withCredentials: true });
        if (response.status === 200) {
            return response.data.numberOfFollowers;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTotalCompanies = async (searchTxt, filters) => {
    try {
        const response = await axios.post(SERVERPOINT + "/api/companies/totalCompanies", { searchTxt, filters }, { withCredentials: true });
        if (response.status === 200) {
            return response.data.totalCompanies;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCompanyById = async (id) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/companies/companyById', { id }, { withCredentials: true });
        if (response.status === 200) {
            return response;
        } else {
            console.error('Failed to fetch company by id:', response.error);
        }
    } catch (error) {
        console.error('Error getting employee by id:', error);
        throw error;
    }
}

export const getSuggestionsByIndustry = async (industry, idExclu) => {
    try {
        const response = await axios.get(SERVERPOINT + "/api/companies/suggestionsByIndustry/?industry=" + industry + "&idExclu=" + idExclu, { withCredentials: true });
        if (response.status === 200)
            return response.data.suggestions;
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

export const updateCompanyProfilePhoto = async (_id, company_photo) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/companies/update/profilePhoto', { _id, company_photo }, { withCredentials: true })
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        console.error('Error updating profile photo:', error);
        throw error;
    }
}

export const updateCompanyCoverPhoto = async (_id, company_cover) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/companies/update/coverPhoto', { _id, company_cover }, { withCredentials: true })
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        console.error('Error updating cover photo:', error);
        throw error;
    }
}

export const getCompanyFollowers = async (companyId, skip, limit) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/companies/follow/getFollowers', { companyId, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.followers;
        return null;
    } catch (error) {
        console.error('Error getting followers for company:', error);
        throw error;
    }
}
