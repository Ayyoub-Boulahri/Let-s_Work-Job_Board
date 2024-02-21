const JobOffer = require('../models/jobOffer')

class JobOfferController {
    getSomeJobOffers = async (req, res) => {
        const { project, skip, limit } = req.body;
        try {
            const jobOffers = await JobOffer.aggregate([
                {
                    $lookup: {
                        from: 'companies',
                        localField: 'company',
                        foreignField: '_id',
                        as: 'company'
                    }
                },
                {
                    $match: {
                        job_status: true
                    }
                },
                {
                    $project: project,
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                }
            ]);
            
            for(var i = 0; i < jobOffers.length; i++) {
                for(var j = 0; j < jobOffers[i].company.length; j++) {
                    if(jobOffers[i].company[j].company_photo){
                        const base64Photo = jobOffers[i].company[j].company_photo.toString('base64');
                        jobOffers[i].company[j].company_photo = base64Photo;
                    }
                }
            }

            if (!jobOffers || jobOffers.length === 0) {
                return res.status(404).json({ error: 'no jobOffer found' })
            }

            return res.status(200).json({ jobOffers: jobOffers });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    getTotalOpenJobOffers = async (req, res) => {
        try {
            const count = await JobOffer.countDocuments({ job_status: true});
            return res.status(200).json({ totalJobOffers: count });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getJobOfferById = async (req, res) => {
        try {
            const { id } = req.query;
            console.log(id)
            const JobOfferResult = await JobOffer.aggregate([
                {
                    $lookup: {
                        from: 'companies',
                        localField: 'company',
                        foreignField: '_id',
                        as: 'company'
                    }
                },
                {
                    $match: { _id: id}
                }
            ]);

            if (!JobOfferResult || JobOfferResult.length === 0)
                return res.status(404).json({ error: 'jobOffer found' })
            
            return res.status(200).json({ jobOffer: JobOfferResult });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

module.exports = new JobOfferController();