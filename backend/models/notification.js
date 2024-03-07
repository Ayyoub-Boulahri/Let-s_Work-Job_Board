const mongoose = require('../db');

const notificationSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderType' },
    senderType: { type: String, enum: ['company', 'employee'] },
    receiver: { type: mongoose.Schema.Types.ObjectId, refPath: 'receiverType' },
    receiverType: { type: String, enum: ['company', 'employee'] },
    message: String,
    read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    notification_link: String
}, {
    versionKey: false
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
