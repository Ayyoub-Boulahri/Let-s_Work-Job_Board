const express = require('express')
const router = express.Router()
const JobOfferController = require('../controllers/jobOfferController')

router.post('/', JobOfferController.getSomeJobOffers) 
router.get('/totalOpenJobOffers', JobOfferController.getTotalOpenJobOffers)
router.get('/jobOfferById', JobOfferController.getJobOfferById)
module.exports = router;