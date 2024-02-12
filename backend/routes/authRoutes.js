const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/employee', AuthController.employeeLogin);

router.post('/company', AuthController.companyLogin);

router.get('/check-authentication', AuthController.checkAuthentication);

router.get('/logout', AuthController.logout);

module.exports = router;
