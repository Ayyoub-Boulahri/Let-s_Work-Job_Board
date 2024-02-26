const express = require('express')
const router = express.Router()
const JobOfferController = require('../controllers/jobOfferController')

router.post('/', JobOfferController.getSomeJobOffers) 
router.get('/totalOpenJobOffers', JobOfferController.getTotalOpenJobOffers)
router.get('/jobOfferById', JobOfferController.getJobOfferById)
router.put('/postulation', JobOfferController.addPostulation)
router.post('/employeePostulation', JobOfferController.getEmployeePostulation)
router.put('/updateEmployeePostulation', JobOfferController.updateEmployeePostulation)
router.post('/someCompanyJobOffers', JobOfferController.getSomeCompanyJobOffers) 
router.post('/companyJobOffersCount', JobOfferController.getCompanyJobOffersCount)
router.post('/employeeJobRequests', JobOfferController.getEmployeeJobRequests)
router.post('/employeeJobRequestsCount', JobOfferController.getEmployeeJobRequestCount)
router.post('/update/removeEmployeeJobPostulation', JobOfferController.removeEmployeeJobPostulation)

module.exports = router;