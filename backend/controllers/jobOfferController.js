const JobOffer = require('../models/jobOffer')

class JobOfferController {
    getAllJobOffers = async (req, res) => {
        try {
            const jobOffers = await JobOffer.aggregate([
                {
                    $lookup: {
                        from: 'companies',
                        localField: 'company',
                        foreignField: '_id',
                        as: 'company'
                    }
                }
            ]);

            console.log(jobOffers)

            if(!jobOffers || jobOffers.length === 0) {
                return res.status(404).json({error: 'no jobOffer found'})
            }

            return res.status(200).json({ jobOffers: jobOffers });
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Internal Server Error'})
        }
    }
}

module.exports = new JobOfferController();