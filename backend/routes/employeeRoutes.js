const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.post('/employeeByEmail', EmployeeController.getEmployeeByEmail)
router.get('/emails', EmployeeController.getAllEmails)
router.delete('/deleteEmployeeById', EmployeeController.deleteEmployee)
router.put('/update/profilePhoto', EmployeeController.updateProfilePhoto)
router.put('/update/employeeInfos', EmployeeController.updateEmployeeInfos)

module.exports = router;