import axios from 'axios';

export const createCompany = async (newCompany) => {
    try {
        const response = await axios.post('http://localhost:5000/api/signup/newCompany', newCompany, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
}

export const getCompanyByEmail = async (email) => {
    try {
        const response = await axios.post('http://localhost:5000/api/companies/companyByEmail', { email }, { withCredentials: true });
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
        const response = await axios.get('http://localhost:5000/api/companies/emails', { withCredentials: true });
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
        const response = await axios.delete('http://localhost:5000/api/companies/deleteCompanyById', { data: { _id: companyId } }, { withCredentials: true })
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

export const getSomeCompanies = async (project, skip, limit) => {
    try {
        const response = await axios.post("http://localhost:5000/api/companies/getSomeCompanies", { project, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.companies;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getNumberOfFollowers = async (id) => {
    try {
        const response = await axios.get("http://localhost:5000/api/companies/companyFollowersNumber/?id=" + id, { withCredentials: true });
        if (response.status === 200) {
            return response.data.numberOfFollowers;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTotalCompanies = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/companies/totalCompanies", { withCredentials: true });
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
        const response = await axios.post('http://localhost:5000/api/companies/companyById', { id }, { withCredentials: true });
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
        const response = await axios.get("http://localhost:5000/api/companies/suggestionsByIndustry/?industry=" + industry + "&idExclu=" + idExclu, { withCredentials: true });
        if (response.status === 200)
            return response.data.suggestions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCompanyInfos = async (_id, infos) => {
    try {
        const response = await axios.put('http://localhost:5000/api/companies/update/companyInfos', { _id, infos } , { withCredentials: true })
        if(response.status === 200){
            return response;
        }
    } catch (error) {
        console.error('Error updating company infos:', error);
        throw error;
    }
}