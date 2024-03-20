const mongoose = require('../db'); 

const supportMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String
}, {
  versionKey: false
});

const SupportMessage = mongoose.model('supportmessage', supportMessageSchema);

module.exports = SupportMessage;
