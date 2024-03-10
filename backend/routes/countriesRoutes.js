const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/countryController');

router.get('/', CountryController.getAllCountries);
router.post('/cities', CountryController.getCities)
router.post('/countriesNames', CountryController.getCountriesNames)
module.exports = router;