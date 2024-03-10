const Country = require('../models/country');

class CountryController {
  getAllCountries = async (req, res) => {
    try {
      const countries = await Country.find().sort({ pays_name: 1 });

      if (!countries || countries.length === 0) {
        return res.status(404).json({ error: 'No countries found' });
      }

      return res.status(200).json({ countries });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getCities = async (req, res) => {
    const { searchCity } = req.body;
    try {
      const cities = await Country.aggregate([
        { $unwind: '$cities' }, // Unwind the array of cities
        { $match: { 'cities.city_name': { $regex: `^${searchCity}`, $options: 'i' } } }, // Match cities that start with searchCity
        { $group: { _id: '$cities.city_name' } } // Group by city name to remove duplicates
      ]);

      const cityNames = cities.map(city => city._id);

      if (!cityNames || cityNames.length === 0) {
        return res.status(404).json({ error: 'No cities found' });
      }

      return res.status(200).json({ cities: cityNames });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getCountriesNames = async (req, res) => {
    const { searchCountry } = req.body;
    try {
      const countries = await Country.find(
        { "pays_name": { $regex: `${searchCountry}`, $options: 'i' } },
        { 'pays_name': 1, _id: 0 }
      )
  
      const countryNames = countries.map(country => country.pays_name);
      if(!countryNames || countryNames.length === 0) 
        return res.status(404).json({ error: 'no country found' })
      
      return res.status(200).json({ countries: countryNames})
    } catch (error) {
      console.error(error)      
      return res.status(500).json({ error: 'Internal Server Error'})
    }

  }


}

module.exports = new CountryController();
