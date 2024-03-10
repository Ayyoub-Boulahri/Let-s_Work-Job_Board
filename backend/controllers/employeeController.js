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

            const cleanedExperiences = experiences.map(experience => {
                const { id_experience, ...rest } = experience;
                return rest;
            });

            const cleanedEducations = degrees.map(degree => {
                const { id_education, ...rest } = degree;
                return rest;
            });

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
                experiences: cleanedExperiences,
                educations: cleanedEducations,
                about: aboutMe,
                address,
                profilePhoto: photoBuffer,
                cv: cvBuffer,
                followings: [],
            });

            const savedEmployee = await newEmployee.save();
            console.log("Employee successfully inserted");
            return res.status(201).json(savedEmployee);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    getEmployeeByEmail = async (req, res) => {
        try {
            const { email } = req.body;
            const employeeInfos = await Employee.findOne({ email }, {followings: 0}).lean();
            if (!employeeInfos)
                return res.status(404).json({ message: 'Employee not found' });

            // Convert the buffer data to base64 string
            const base64Photo = employeeInfos.profilePhoto.toString('base64');
            const base64Cv = employeeInfos.cv.toString('base64');
            // Replace the buffer data with base64 string in the response
            employeeInfos.profilePhoto = base64Photo;
            employeeInfos.cv = base64Cv;

            // Format date_debut field in experiences array if it exists
            if (employeeInfos.experiences && employeeInfos.experiences.length > 0) {
                employeeInfos.experiences.forEach(experience => {
                    if (experience.date_debut) {
                        experience.date_debut = new Date(experience.date_debut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }
                });
            }

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

            return res.status(200).json({ message: "Employee deleted successfully" });
        } catch (error) {
            console.error("Error deleting employee:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    updateProfilePhoto = async (req, res) => {
        try {
            const { _id, profilePhoto } = req.body;

            // Convert base64 string to buffer
            const photoBuffer = Buffer.from(profilePhoto, 'base64');

            // Update profile photo for the employee
            const updateResult = await Employee.updateOne(
                { _id: _id }, // Filter by _id
                { $set: { "profilePhoto": photoBuffer } }
            );

            if (updateResult.nModified === 0) {
                return res.status(404).json({ message: "Employee not found or profile photo not updated" });
            }

            return res.status(200).json({ message: "Profile photo updated successfully" });
        } catch (error) {
            console.error("Error updating photo:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    updateEmployeeInfos = async (req, res) => {
        try {
            const { _id, infos } = req.body;
            const updateResult = await Employee.updateOne(
                { _id: _id },
                { $set: infos }
            );

            if (updateResult.nModified === 0) {
                return res.status(404).json({ message: "Employee not found" });
            }

            return res.status(200).json({ message: "infos updated successfully" });
        } catch (error) {
            console.error("Error updating employee infos:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    addEmployeeSkill = async (req, res) => {
        try {
            const { newSkill, _id } = req.body;
            const addSkillResult = await Employee.updateOne(
                { _id: _id },
                { $push: { skills: newSkill } }
            );

            if(addSkillResult.nModified === 0) {
                return res.status(404).json({ message: 'skill not adding or employee not found' })
            }

            return res.status(200).json({ message: "Skill adding successfully" })
        } catch (error) {
            console.error("error adding new skill", error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    addEmployeeExperience = async (req, res) => {
        try {
            const { newExperience, _id } = req.body;
            const addExperienceResult = await Employee.updateOne(
                { _id: _id },
                { $push: { experiences: newExperience } }
            );

            if(addExperienceResult.nModified === 0) {
                return res.status(404).json({ message: 'Experience not adding or employee not found' })
            }

            return res.status(200).json({ message: "Experience adding successfully" })
        } catch (error) {
            console.error("error adding new Experience", error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }


    removeEmployeeSkill = async (req, res) => {
        try {
            const { removedSkill, _id } = req.body;
            const removeSkillResult = await Employee.updateOne(
                { _id: _id },
                { $pull: { skills: removedSkill } }
            );

            if(removeSkillResult.nModified === 0) {
                return res.status(404).json({ message: 'skill not removed or employee not found' })
            }

            return res.status(200).json({ message: "Skill removed successfully" })
        } catch (error) {
            console.error("error removing skill", error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    removeEmployeeExperience = async (req, res) => {
        try {
            const { removedExperienceId, _id } = req.body;
            const removeExperienceResult = await Employee.updateOne(
                { _id: _id },
                { $pull: { experiences: { _id: removedExperienceId } } }
            );

            if(removeExperienceResult.nModified === 0) {
                return res.status(404).json({ message: 'Experience not removed or employee not found' })
            }

            return res.status(200).json({ message: "Experience removed successfully" })
        } catch (error) {
            console.error("error removing Experience", error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    addEmployeeEducation = async (req, res) => {
        try {
            const { newEducation, _id } = req.body;
            const addEducationResult = await Employee.updateOne(
                { _id: _id },
                { $push: { educations: newEducation } }
            );

            if(addEducationResult.nModified === 0) {
                return res.status(404).json({ message: 'Education not adding or employee not found' })
            }

            return res.status(200).json({ message: "Education adding successfully" })
        } catch (error) {
            console.error("error adding new Education", error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    removeEmployeeEducation = async (req, res) => {
        try {
            const { removedEducationId, _id } = req.body;
            const removeEducationResult = await Employee.updateOne(
                { _id: _id },
                { $pull: { educations: { _id: removedEducationId } } }
            );

            if(removeEducationResult.nModified === 0) {
                return res.status(404).json({ message: 'Education not removed or employee not found' })
            }

            return res.status(200).json({ message: "Education removed successfully" })
        } catch (error) {
            console.error("error removing Education", error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    updateEmployeeCv = async (req, res) => {
        try {
            const { _id, cv } = req.body;
            const cvBuffer = Buffer.from(cv, 'base64');

            const updateResult = await Employee.updateOne(
                { _id: _id},
                { $set: { "cv": cvBuffer } }
            )

            if(updateResult.nModified === 0)
                return res.status(404).json({ message: "cv not updated ro employee not found" });
            
            return res.status(200).json({ message: "cv updated successfully" });
        } catch (error) {
            console.error("Error updating cv: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    addFollowing = async (req, res) => {
        try {
            const { company_id, employee_id} = req.body;
            const followResult = await Employee.updateOne(
                { _id: employee_id },
                {
                    $push: {
                        followings: {
                            company: company_id,
                        }
                    }
                }
            )
            if (followResult.nModified === 0)
                return res.status(404).json({ message: "employee not found or following not add" });

            return res.status(200).json({ message: "follow successfull" })
        } catch (error) {
            console.error("Error follow: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    removeFollowing = async (req, res) => {
        try {
            const { company_id, employee_id } = req.body;
            const unfollowResult = await Employee.updateOne(
                { _id: employee_id },
                {
                    $pull: {
                        followings: { company: company_id }
                    }
                }
            );
    
            if (unfollowResult.nModified === 0)
                return res.status(404).json({ message: "Employee not found or following not removed" });
    
            return res.status(200).json({ message: "Following successfully removed" });
        } catch (error) {
            console.error("Error removing following: " + error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    getSomeEmployees = async (req, res) => {
        try {
            const { project, skip, limit } = req.body;

            const employees = await Employee.find({}, project)
                .skip(parseInt(skip))
                .limit(parseInt(limit)).lean();

            for (let i = 0; i < employees.length; i++) {
                const base64Photo = employees[i].profilePhoto.toString('base64');
                employees[i].profilePhoto = base64Photo;
            }


            if (!employees || employees.length === 0) {
                return res.status(404).json({ error: 'No employee found' });
            }

            return res.status(200).json({ employees: employees });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getTotalEmployees = async (req, res) => {
        try {
            const count = await Employee.countDocuments();
            return res.status(200).json({ totalEmployees: count });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getEmployeeById = async (req, res) => {
        const { employeeId } = req.body;
        try {
            const employeeInfos = await Employee.findOne({ _id: employeeId }, { followings: 0, password: 0}).lean()
            if (!employeeInfos)
                return res.status(404).json({ message: 'Employee not found' });

            const base64Photo = employeeInfos.profilePhoto.toString('base64');
            const base64Cv = employeeInfos.cv.toString('base64');

            employeeInfos.profilePhoto = base64Photo;
            employeeInfos.cv = base64Cv;

            return res.status(200).json({ employeeInfos: employeeInfos });
        } catch (error) {
            console.log('error getting employee : ' + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    getEmployeeProfilePhoto = async (employeeId) => {
        try {
            const { profilePhoto } = await Employee.findOne({ _id: employeeId }, { _id: 0, profilePhoto: 1}).lean();
            let photoBase64 = null;
            if (profilePhoto) {
                photoBase64 = profilePhoto.toString('base64');
            }
            return { profilePhoto: photoBase64 }
        } catch (error) {
            throw error
        }
    }

    getEmployeeInfos = async (req, res) => {
        const { employeeId, project } = req.body;
        try {
            const infos = await Employee.find({ _id: employeeId }, project);

            if(!infos || infos.length === 0)
                return res.status(404).json({ message: 'Employee not found' });

            return res.status(200).json({ infos })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
}


module.exports = new EmployeeController();
