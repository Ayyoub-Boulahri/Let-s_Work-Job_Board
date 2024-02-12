const express = require('express')
const router = express.Router()
const JobOfferController = require('../controllers/jobOfferController')

router.get('/', JobOfferController.getAllJobOffers) 

module.exports = router;