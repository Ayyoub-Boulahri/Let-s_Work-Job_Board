const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/countryController');

router.get('/', CountryController.getAllCountries);

module.exports = router;