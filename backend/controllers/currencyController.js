const Currency = require('../models/currency');

class CurrencyController {
    getAllCurrencies = async (req, res) => {
        try {

            const currencies = await Currency.find({}, { code_currency: 1 });

            if (!currencies || currencies.length === 0) {
                return res.status(404).json({ error: 'No currencies found' });
            }

            return res.status(200).json({ currencies: currencies });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };

}

module.exports = new CurrencyController();
