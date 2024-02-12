const Country = require('../models/country');

class CountryController {
  getAllCountries = async (req, res) => {
    try {
      const countries = await Country.find();

      if (!countries || countries.length === 0) {
        return res.status(404).json({ error: 'No countries found' });
      }

      return res.status(200).json({ countries });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

module.exports = new CountryController();
