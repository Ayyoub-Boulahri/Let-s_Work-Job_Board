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
        const response = await axios.post('http://localhost:5000/api/jobOffers/employeePostulation', { jobId, employeeId }, { withCredentials: true });
        if (response.status === 200) {
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

export const getSomeCompanyJobOffers = async (id, project, skip, limit, condition) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers/someCompanyJobOffers", { id, project, skip, limit, condition }, { withCredentials: true });
        if (response.status === 200)
            return response.data.jobOffers;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCompanyJobOffersCount = async (companyId, condition) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers/companyJobOffersCount", { companyId, condition }, { withCredentials: true });
        if (response.status === 200)
            return response.data.jobOffersCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getEmployeeJobRequests = async (employeeId, skip, limit, condition, searchFilter) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/employeeJobRequests', { employeeId, skip, limit, condition, searchFilter }, { withCredentials: true });
        if (response.status === 200) {
            return response.data.result;
        }
        else if(response.status === 404)
            return []
    } catch (error) {
        console.error('Error getting employee job requests:', error);
        throw error;
    }
};

export const getEmployeeJobRequestsCount = async (employeeId, condition, searchFilter) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/employeeJobRequestsCount', { employeeId, condition, searchFilter }, { withCredentials: true });

        if (response.status === 200) {
            return response.data.totalJobOffers;
        }
        else if(response.status === 404)
            return []
    } catch (error) {
        console.error('Error getting employee job requests Count:', error);
        throw error;
    }
};

export const removeEmployeeJobPostulation = async (jobOfferId, employeeId) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/update/removeEmployeeJobPostulation', { jobOfferId, employeeId }, { withCredentials: true });

        if (response.status === 200) 
            return response;
        
    } catch (error) {
        console.error('Error removing employee Postulation:', error);
        throw error;
    }
};