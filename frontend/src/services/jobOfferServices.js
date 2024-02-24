import axios from 'axios';

export const getSomeJobOffers = async (project, skip, limit) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers", { project, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.jobOffers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTotalOpenJobOffers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/jobOffers/totalOpenJobOffers", { withCredentials: true });
        if (response.status === 200)
            return response.data.totalJobOffers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getJobofferById = async (id) => {
    try {
        const response = await axios.get("http://localhost:5000/api/jobOffers/jobOfferById/?id=" + id, { withCredentials: true });
        if (response.status === 200)
            return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addPostulation = async (jobId, employeeId, attachements) => {
    try {
        const response = await axios.put('http://localhost:5000/api/jobOffers/postulation', { jobId, employeeId, attachements }, { withCredentials: true });
        if (response.status === 200) {
            console.log("add successfully")
            return response;
        }
    } catch (error) {
        console.error('Error adding new Postulation : ', error);
        throw error;
    }
}

export const getEmployeePostulation = async (jobId, employeeId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/employeePostulation', { jobId, employeeId}, { withCredentials: true });
        if (response.status === 200) {
            console.log("postulation getted successfully")
            return response;
        }
    } catch (error) {
        console.error('Error getting employee postulation : ', error);
        throw error;
    }
}

export const updateEmployeePostulation = async (jobId, employeeId, attachements) => {
    try {
        const response = await axios.put('http://localhost:5000/api/jobOffers/updateEmployeePostulation', { jobId, employeeId, attachements }, { withCredentials: true });
        if (response.status === 200) {
            console.log("update successfully")
            return response;
        }
    } catch (error) {
        console.error('Error updating postulation : ', error);
        throw error;
    }
}

export const getSomeCompanyJobOffers = async (id, project, skip, limit) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers/someCompanyJobOffers", { id, project, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.jobOffers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCompanyJobOffersCount = async (companyId) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers/companyJobOffersCount", { companyId }, { withCredentials: true });
        if (response.status === 200)
            return response.data.jobOffersCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
}