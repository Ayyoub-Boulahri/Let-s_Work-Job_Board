const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.post('/employeeByEmail', EmployeeController.getEmployeeByEmail)
router.get('/emails', EmployeeController.getAllEmails)
router.delete('/deleteEmployeeById', EmployeeController.deleteEmployee)
router.put('/update/profilePhoto', EmployeeController.updateProfilePhoto)
router.put('/update/employeeInfos', EmployeeController.updateEmployeeInfos)
router.put('/update/addEmployeeSkill', EmployeeController.addEmployeeSkill)
router.put('/update/addEmployeeExperience', EmployeeController.addEmployeeExperience)
router.put('/update/removeEmployeeSkill', EmployeeController.removeEmployeeSkill)
router.put('/update/removeEmployeeExperience', EmployeeController.removeEmployeeExperience)
router.put('/update/addEmployeeEducation', EmployeeController.addEmployeeEducation)
router.put('/update/removeEmployeeEducation', EmployeeController.removeEmployeeEducation)
router.put('/update/cv', EmployeeController.updateEmployeeCv)
router.put('/follow/addFollowing', EmployeeController.addFollowing)
router.put('/follow/removeFollowing', EmployeeController.removeFollowing)
router.post('/getSomeEmployees', EmployeeController.getSomeEmployees)
router.post('/totalEmployees', EmployeeController.getTotalEmployees)
router.post('/employeeById', EmployeeController.getEmployeeById)
router.post('/employeeInfos', EmployeeController.getEmployeeInfos)
router.post('/educationDegreesNames', EmployeeController.getEducationDegreesNames)

module.exports = router;