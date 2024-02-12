const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.post('/employeeByEmail', EmployeeController.getEmployeeByEmail)
router.get('/emails', EmployeeController.getAllEmails)
router.delete('/deleteEmployeeById', EmployeeController.deleteEmployee)

module.exports = router;