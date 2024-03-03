const express = require('express')
const router = express.Router()
const NotificationController = require('../controllers/notificationController')

router.post('/totalUnreadNotifications', NotificationController.getTotalUnreadNotifications)
router.post('/employeeNotifications', NotificationController.getEmployeeNotifications)

module.exports = router;