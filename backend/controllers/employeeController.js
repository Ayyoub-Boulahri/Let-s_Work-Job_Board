const Employee = require('../models/employee');

class EmployeeController {
    insertEmployee = async (req, res) => {
        try {
            const {
                cin,
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                dob,
                city,
                country,
                skills,
                experiences,
                degrees,
                address,
                profilePhoto,
                cv,
                aboutMe,
            } = req.body;

            const photoBuffer = Buffer.from(profilePhoto, 'base64');
            const cvBuffer = Buffer.from(cv.blobObj, 'base64');

            const newEmployee = new Employee({
                cin,
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                phone: phoneNumber,
                date_of_birth: dob,
                city,
                country,
                skills,
                experiences,
                educations: degrees,
                about: aboutMe,
                address,
                profilePhoto: photoBuffer,
                cv: cvBuffer,
                followings: [],
            });

            const savedEmployee = await newEmployee.save();
            console.log("Employee successfully inserted");
            res.status(201).json(savedEmployee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    getEmployeeByEmail = async (req, res) => {
        try {
            const { email } = req.body;
            console.log(email)
            const employeeInfos = await Employee.findOne({ email }).lean();
            if (!employeeInfos)
                return res.status(404).json({ message: 'Employee not found' });

            // Convert the buffer data to base64 string
            const base64Photo = employeeInfos.profilePhoto.toString('base64');
            // Replace the buffer data with base64 string in the response
            employeeInfos.profilePhoto = base64Photo;

            return res.status(200).json(employeeInfos);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getAllEmails = async (req, res) => {
        try {
            // Fetch all employees from the database
            const employees = await Employee.find({}, { email: 1 }).lean();

            // Extract email addresses from the employee documents
            const emails = employees.map(employee => employee.email);

            // Return the list of emails in the response
            return res.status(200).json({ emails });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    deleteEmployee = async (req, res) => {
        try {
            const { _id } = req.body;

            const deleteResult = await Employee.deleteOne({ _id: _id });

            if (deleteResult.deletedCount === 0) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json({ message: "Employee deleted successfully" });
        } catch (error) {
            console.error("Error deleting employee:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}


module.exports = new EmployeeController();
