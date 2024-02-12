const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');

router.post('/companyByEmail', CompanyController.getCompanyByEmail)
router.get('/emails', CompanyController.getAllEmails)
router.delete('/deleteCompanyById', CompanyController.deleteCompany)

module.exports = router;