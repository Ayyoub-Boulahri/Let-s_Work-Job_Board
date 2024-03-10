const mongoose = require('../db'); 

const countrySchema = new mongoose.Schema({
  id_pays: String,
  pays_name: String,
  cities: [
    {
        id_city: String,
        city_name: String
    }
  ]
}, {
  versionKey: false
});

const Country = mongoose.model('country', countrySchema);

module.exports = Country;
