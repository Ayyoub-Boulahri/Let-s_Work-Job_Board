const express = require('express');
const router = express.Router();
const IndustriesController = require('../controllers/industriesController')

router.get('/', IndustriesController.getAllIndustries);

module.exports = router;