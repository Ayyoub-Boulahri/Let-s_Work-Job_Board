const express = require('express')
const router = express.Router()
const NotificationController = require('../controllers/notificationController')
const notificationController = require('../controllers/notificationController')

router.post('/totalUnreadNotifications', NotificationController.getTotalUnreadNotifications)
router.post('/employeeNotifications', NotificationController.getEmployeeNotifications)
router.post('/companyNotifications', NotificationController.getCompanyNotifications)
router.post('/changeNotificationStatus', notificationController.changeNotificationStatus)

module.exports = router;