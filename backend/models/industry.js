const mongoose = require('../db'); 

const industrySchema = new mongoose.Schema({
  INDUSTRY_NAME: String
}, {
  versionKey: false
});

const Industry = mongoose.model('industry', industrySchema);

module.exports = Industry;
