const mongoose = require('../db'); 

const currencySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  currency_libelle: String,
  code_currency: String, 
  symbol: String
}, {
  versionKey: false
});

const Currency = mongoose.model('currency', currencySchema);

module.exports = Currency;
