const express = require('express');
const router = express.Router();
const SupportMessagesController = require('../controllers/supportMessagesController');

router.post('/insertMessage', SupportMessagesController.insertMessage);

module.exports = router;
