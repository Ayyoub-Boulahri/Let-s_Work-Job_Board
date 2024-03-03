const Notification = require('../models/notification');
const { ObjectId } = require('mongodb');

class NotificationController {
    createNotification = async (senderId, senderType, receiverId, receiverType, message) => {
        try {
            const newNotification = new Notification({
                sender: senderId,
                senderType: senderType,
                receiver: receiverId,
                receiverType: receiverType,
                message: message
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
                {
                    $project: {
                        _id: 1,
                        company_photo: "$sender.company_photo",
                        message: 1,
                        read: 1,
                        created_at: 1
                    }
                }
            ]);

            return res.status(200).json({ notifications });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new NotificationController();