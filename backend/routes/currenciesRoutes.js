const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/currencyController');

router.get('/', CurrencyController.getAllCurrencies);

module.exports = router;
