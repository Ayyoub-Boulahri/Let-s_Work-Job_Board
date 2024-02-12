const mongoose = require('../db'); // Adjust the path based on your project structure

const companySchema = new mongoose.Schema({
  company_email: String,
  city: String,
  country: String,
  industry: String,
  password: String,
  company_name: String,
  description: String,
  company_phone: String,
  certificat: {
    file_name: String,
    file: Buffer,
  },
  isApproved: Boolean,
  address: String,
  company_photo: Buffer,
  company_cover: Buffer,
  founded_year: Number,
  size: String,
  followers: [
    {
      employee: mongoose.Schema.Types.ObjectId,
      date_follow: { type: Date, default: Date.now },
    }
  ]
}, {
  versionKey: false 
});

const Company = mongoose.model('company', companySchema);

module.exports = Company;
