const Notification = require('../models/notification');
const { ObjectId } = require('mongodb');

class NotificationController {
    createNotification = async (senderId, senderType, receiverId, receiverType, message, notification_link) => {
        try {
            const newNotification = new Notification({
                sender: senderId,
                senderType: senderType,
                receiver: receiverId,
                receiverType: receiverType,
                message: message,
                notification_link: notification_link
            });

            await newNotification.save();

            console.log('Notification created successfully');
            return newNotification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    };

    getTotalUnreadNotifications = async (req, res) => {
        const { userId } = req.body;
        try {
            const totalNotification = await Notification.find({ receiver: userId, read: false }).countDocuments();
            return res.status(200).json({ totalNotification })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }


    getEmployeeNotifications = async (req, res) => {
        const { employeeId } = req.body;
        try {
            const notifications = await Notification.aggregate([
                {
                    $match: {
                        receiver: new ObjectId(employeeId),
                        senderType: "company",
                        receiverType: "employee"
                    }
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "sender",
                        foreignField: "_id",
                        as: "sender"
                    }
                },
                {
                    $addFields: {
                        sender: { $arrayElemAt: ["$sender", 0] }
                    }
                },
                { $sort: {created_at: -1 }}, 
                {
                    $project: {
                        _id: 1,
                        photo: "$sender.company_photo",
                        message: 1,
                        read: 1,
                        notification_link: 1,
                        created_at: 1
                    }
                }
            ]);

            for (var i = 0; i < notifications.length; i++) {
                var photobase64 = notifications[i].photo.toString('base64')
                notifications[i].photo = photobase64
            }

            return res.status(200).json({ notifications });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getCompanyNotifications = async (req, res) => {
        const { companyId } = req.body;
        try {
            const notifications = await Notification.aggregate([
                {
                    $match: {
                        receiver: new ObjectId(companyId),
                        senderType: "employee",
                        receiverType: "company"
                    }
                },
                {
                    $lookup: {
                        from: "employees",
                        localField: "sender",
                        foreignField: "_id",
                        as: "sender"
                    }
                },
                {
                    $addFields: {
                        sender: { $arrayElemAt: ["$sender", 0] }
                    }
                },
                { $sort: {created_at: -1 }}, 
                {
                    $project: {
                        _id: 1,
                        photo: "$sender.profilePhoto",
                        message: 1,
                        read: 1,
                        notification_link: 1,
                        created_at: 1
                    }
                }
            ]);

            for (var i = 0; i < notifications.length; i++) {
                var photobase64 = notifications[i].photo.toString('base64')
                notifications[i].photo = photobase64
            }

            return res.status(200).json({ notifications });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    changeNotificationStatus = async (req, res) => {
        const { notificationId } = req.body;
        try {
            const changeNotification = await Notification.updateOne(
                { _id: notificationId },
                { $set: { read: true } }
            )

            if(changeNotification.nModified === 0)
                return res.status(404).json({ message: 'notification not found' })
            
            return res.status(200).json({ message: "notification status changed" })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new NotificationController();