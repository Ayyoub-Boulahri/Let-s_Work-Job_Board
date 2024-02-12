const mongoose = require('../db'); 

const currencySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CURRENCY_LIBELLE: String,
  CODE_CURRENCY: String, 
  SYMBOL: String
}, {
  versionKey: false
});

const Currency = mongoose.model('currency', currencySchema);

module.exports = Currency;
