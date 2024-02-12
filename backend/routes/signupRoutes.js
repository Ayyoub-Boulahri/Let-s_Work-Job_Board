const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');
const EmployeeController = require('../controllers/employeeController')

router.post('/newCompany', CompanyController.insertCompany);
router.post('/newEmployee', EmployeeController.insertEmployee);

module.exports = router;
