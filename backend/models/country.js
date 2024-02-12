const mongoose = require('../db'); 

const countrySchema = new mongoose.Schema({
  ID_PAYS: String,
  PAYS_NAME: String,
  CITIES: [
    {
        ID_CITY: String,
        CITY_NAME: String
    }
  ]
}, {
  versionKey: false
});

const Country = mongoose.model('country', countrySchema);

module.exports = Country;
