const Industry = require('../models/industry');

class IndustriesController {
  getAllIndustries = async (req, res) => {
    try {
      const industries = await Industry.find().sort({industry_name:1});

      if (!industries || industries.length === 0) {
        return res.status(404).json({ error: 'No industry found' });
      }

      return res.status(200).json({ industries });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

module.exports = new IndustriesController();
