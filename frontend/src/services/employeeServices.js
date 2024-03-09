import axios from 'axios';
import { SERVERPOINT } from '../schemas/data';

export const createEmployee = async (newEmployee) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/signup/newEmployee', newEmployee, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating new employee:', error);
        throw error;
    }
};


export const getEmployeeByEmail = async (email) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/employees/employeeByEmail', { email }, { withCredentials: true });
        if (response.status === 200) {
            return response;
          } else {
            console.error('Failed to fetch employee by email:', response.error);
          }       
    } catch(error) {
        console.error('Error getting employee by email:', error);
        throw error;
    }
}

export const getAllEmployeeEmails = async () => {
    try {
        const response = await axios.get(SERVERPOINT + '/api/employees/emails', { withCredentials: true });
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

export const deleteEmployeeById = async (employeeId) => {
    try {
        const response = await axios.delete(SERVERPOINT + '/api/employees/deleteEmployeeById', { data: { _id: employeeId } }, { withCredentials: true })
        if(response.status === 200) {
            console.log("delete successfully")
            return true;
        }else {
            console.error('Failed to delete employee:', response.error);
            return false
        }
    } catch(error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
}

export const updateProfilePhoto = async (_id, profilePhoto) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/profilePhoto', { _id, profilePhoto } , { withCredentials: true })
        if(response.status === 200){
            console.log("update successfully")
            return response
        }
    } catch (error) {
        console.error('Error updating profile photo:', error);
        throw error;
    }
}

export const updateEmployeeInfos = async (_id, infos) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/employeeInfos', { _id, infos } , { withCredentials: true })
        if(response.status === 200){
            console.log("update successfully")
            return response;
        }
    } catch (error) {
        console.error('Error updating employee infos:', error);
        throw error;
    }
}

export const addEmployeeSkill = async (_id, newSkill) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/addEmployeeSkill', { _id, newSkill } , { withCredentials: true });
        if(response.status === 200) {
            console.log("add successfully")
            return response;
        }
    } catch (error) {
        console.error('Error adding new skill : ', error);
        throw error;
    }
}

export const addEmployeeExperience = async (_id, newExperience) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/addEmployeeExperience', { _id, newExperience } , { withCredentials: true });
        if(response.status === 200) {
            console.log("add successfully")
            return response;
        }
    } catch (error) {
        console.error('Error adding new Experience : ', error);
        throw error;
    }
}

export const removeEmployeeSkill = async (_id, removedSkill) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/removeEmployeeSkill', { _id, removedSkill } , { withCredentials: true });
        if(response.status === 200) {
            console.log("remove successfully")
            return response;
        }
    } catch (error) {
        console.error('Error removing skill : ', error);
        throw error;
    }
}

export const removeEmployeeExperience = async (_id, removedExperienceId) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/removeEmployeeExperience', { _id, removedExperienceId } , { withCredentials: true });
        if(response.status === 200) {
            console.log("remove successfully")
            return response;
        }
    } catch (error) {
        console.error('Error removing Experience : ', error);
        throw error;
    }
}

export const addEmployeeEducation = async (_id, newEducation) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/addEmployeeEducation', { _id, newEducation } , { withCredentials: true });
        if(response.status === 200) {
            console.log("add successfully")
            return response;
        }
    } catch (error) {
        console.error('Error adding new Education : ', error);
        throw error;
    }
}

export const removeEmployeeEducation = async (_id, removedEducationId) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/removeEmployeeEducation', { _id, removedEducationId } , { withCredentials: true });
        if(response.status === 200) {
            console.log("remove successfully")
            return response;
        }
    } catch (error) {
        console.error('Error removing Education : ', error);
        throw error;
    }
}

export const updateEmployeeCv = async (_id, cv) => {
    try {
        const response = await axios.put(SERVERPOINT + '/api/employees/update/cv', { _id, cv } , { withCredentials: true })
        if(response.status === 200){
            console.log("update successfully")
            return response
        }
    } catch (error) {
        console.error('Error updating cv :', error);
        throw error;
    }
}

export const getSomeEmployees = async (project, skip, limit) => {
    try {
        const response = await axios.post(SERVERPOINT + "/api/employees/getSomeEmployees", { project, skip, limit }, { withCredentials: true });
        if (response.status === 200)
            return response.data.employees;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTotalEmployees = async () => {
    try {
        const response = await axios.get(SERVERPOINT + "/api/employees/totalEmployees", { withCredentials: true });
        if (response.status === 200) {
            return response.data.totalEmployees;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.post(SERVERPOINT + "/api/employees/employeeById", { employeeId }, { withCredentials: true });
        if (response.status === 200)
            return response.data.employeeInfos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}