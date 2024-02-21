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