import axios from 'axios';

export const createEmployee = async (newEmployee) => {
    try {
        const response = await axios.post('http://localhost:5000/api/signup/newEmployee', newEmployee, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creating new employee:', error);
        throw error;
    }
};


export const getEmployeeByEmail = async (email) => {
    try {
        const response = await axios.post('http://localhost:5000/api/employees/employeeByEmail', { email }, { withCredentials: true });
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
        const response = await axios.get('http://localhost:5000/api/employees/emails', { withCredentials: true });
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
        const response = await axios.delete('http://localhost:5000/api/employees/deleteEmployeeById', { data: { _id: employeeId } }, { withCredentials: true })
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
        const response = await axios.put('http://localhost:5000/api/employees/update/profilePhoto', { _id, profilePhoto } , { withCredentials: true })
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
    console.log(_id)
    try {
        const response = await axios.put('http://localhost:5000/api/employees/update/employeeInfos', { _id, infos } , { withCredentials: true })
        if(response.status === 200){
            console.log("update successfully")
            return response;
        }
    } catch (error) {
        console.error('Error updating employee infos:', error);
        throw error;
    }
}