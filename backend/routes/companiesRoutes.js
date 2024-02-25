const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');

router.post('/companyByEmail', CompanyController.getCompanyByEmail)
router.get('/emails', CompanyController.getAllEmails)
router.delete('/deleteCompanyById', CompanyController.deleteCompany)
router.post('/getSomeCompanies', CompanyController.getSomeCompanies)
router.get('/totalCompanies', CompanyController.getTotalCompanies)
router.get('/companyFollowersNumber', CompanyController.getFollowersNumber)
router.post('/companyById', CompanyController.getCompanyById)
router.get('/suggestionsByIndustry', CompanyController.getSuggestionsByIndustry)
router.put('/follow/addFollower', CompanyController.addFollower)
router.put('/follow/removeFollower', CompanyController.removeFollower)
router.post('/follow/isFollower', CompanyController.isFollower)
router.put('/update/companyInfos', CompanyController.updateCompanyInfos)
router.put('/update/profilePhoto', CompanyController.updateCompanyProfilePhoto)
router.put('/update/coverPhoto', CompanyController.updateCompanyCoverPhoto)

module.exports = router;