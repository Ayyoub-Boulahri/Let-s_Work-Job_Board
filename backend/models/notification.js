const mongoose = require('../db');

const notificationSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderType' },
    senderType: { type: String, enum: ['Company', 'Employee'] },
    receiver: { type: mongoose.Schema.Types.ObjectId, refPath: 'receiverType' },
    receiverType: { type: String, enum: ['Company', 'Employee'] },
    message: String,
    read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, {
    versionKey: false
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
