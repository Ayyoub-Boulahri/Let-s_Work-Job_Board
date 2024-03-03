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

export const getSomeCompanyJobOffers = async (id, project, skip, limit, condition, searchFilter) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers/someCompanyJobOffers", { id, project, skip, limit, condition, searchFilter }, { withCredentials: true });
        if (response.status === 200){
            return response.data.jobOffers;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCompanyJobOffersCount = async (companyId, condition, searchFilter) => {
    try {
        const response = await axios.post("http://localhost:5000/api/jobOffers/companyJobOffersCount", { companyId, condition, searchFilter }, { withCredentials: true });
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

export const deleteJobOffer = async (jobOfferId) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/jobOffers/deleteJobOffer', { data: { jobOfferId } }, { withCredentials: true })
        if(response.status === 200)
            return true;
        return false
    } catch(error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
}

export const getPostulations = async (jobOfferId, project, skip, limit, searchFilter, condition) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/postulations', { jobOfferId, project, skip, limit, searchFilter, condition }, { withCredentials: true })
        if(response.status === 200)
            return response.data.postulations
    } catch (error) {
        console.error("Error getting postulations : ", error)
        throw error;
    }
}

export const getJobOfferPostulationsTotal = async (jobOfferId, searchFilter) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/postulationsTotal', { jobOfferId, searchFilter }, { withCredentials: true });
        if (response.status === 200)
            return response.data.totalPostulations;
    } catch (error) {
        console.error("Error getting postulations total: ", error);
        throw error;
    }
};

export const changePostulationStatus = async (jobOfferId, status, employeeIds) => {
    try {
        const response = await axios.put('http://localhost:5000/api/jobOffers/changePostulationStatus', { jobOfferId, status, employeeIds }, { withCredentials: true })
        if(response.status === 200)
            return response;
    } catch (error) {
        console.log("Error changing postulation status : ", error)
        throw error;
    }
}

export const insertJobOffer = async (jobOffer) => {
    try {
        const response = await axios.post('http://localhost:5000/api/jobOffers/insertJobOffer', { jobOffer }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error inserting new job Offer:', error);
        throw error;
    }
};

export const updateJobOfferInfos = async (jobOfferId, newInfos) => {
    try {
        const response = await axios.put('http://localhost:5000/api/jobOffers/update/updateJobOfferInfos', { jobOfferId, newInfos }, { withCredentials: true });
        return response;
    } catch (error) {
        console.error('Error inserting new job Offer:', error);
        throw error;
    }
};

