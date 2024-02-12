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
    } catch(error) {
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
    } catch(error) {
        console.error('Error getting emails:', error);
        throw error;
    }
}

export const deleteCompanyById = async (companyId) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/companies/deleteCompanyById', { data: { _id: companyId } }, { withCredentials: true })
        if(response.status === 200) {
            console.log("delete successfully")
            return true;
        }else {
            console.error('Failed to delete company:', response.error);
            return false
        }
    } catch(error) {
        console.error('Error deleting company:', error);
        throw error;
    }
}