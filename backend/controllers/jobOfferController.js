const JobOffer = require('../models/jobOffer')
const { ObjectId } = require('mongodb');

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

            for (var i = 0; i < jobOffers.length; i++) {
                for (var j = 0; j < jobOffers[i].company.length; j++) {
                    if (jobOffers[i].company[j].company_photo) {
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
            const count = await JobOffer.countDocuments({ job_status: true });
            return res.status(200).json({ totalJobOffers: count });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getJobOfferById = async (req, res) => {
        try {
            const { id } = req.query;
            const jobId = new ObjectId(id)
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
                    $match: { _id: jobId }
                },
                {
                    $project: { postulations: 0, "company.followers": 0 }
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

    addPostulation = async (req, res) => {
        try {
            const { jobId, employeeId, attachements } = req.body;
            const postulation = await JobOffer.updateOne(
                { _id: jobId },
                {
                    $push: {
                        postulations: {
                            employee: employeeId,
                            attachements: attachements
                        }
                    }
                }
            )
            if (postulation.nModified === 0)
                return res.status(404).json({ message: "job Offer not found or postulation not completed" });

            return res.status(200).json({ message: "postulation successfull" })
        } catch (error) {
            console.error("Error postulation: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    updateEmployeePostulation = async (req, res) => {
        try {
            const { jobId, employeeId, attachements } = req.body;
            const postulation = await JobOffer.updateOne(
                { _id: jobId },
                {
                    $set: {
                        "postulations.$[elem].attachements": attachements, 
                        "postulations.$[elem].date_postulation": Date.now()
                    }
                },

                { arrayFilters: [{ "elem.employee": employeeId }] }
            )
            if (postulation.nModified === 0)
                return res.status(404).json({ message: "job Offer not found or postulation not updated" });

            return res.status(200).json({ message: "postulation updated successfully" })
        } catch (error) {
            console.error("Error update postulation: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    getEmployeePostulation = async (req, res) => {
        try {
            const { jobId, employeeId } = req.body;
            const postulationResult = await JobOffer.find({
                $and: [
                    { _id: jobId },
                    { "postulations.employee": employeeId }
                ]
            },
                { postulations: 1 }
            );

            if (!postulationResult || postulationResult.length === 0)
                return res.status(404).json({ message: "employee not postuled" });

            return res.status(200).json({ postulations: postulationResult })
        } catch (error) {
            console.error("Error getting postulation: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    getSomeCompanyJobOffers = async (req, res) => {
        const { id, project, skip, limit } = req.body;
        console.log(id, skip)
        try {
            const jobOffers = await JobOffer.find({ company: id, job_status: true }, project).skip(skip).limit(limit)

            if (!jobOffers || jobOffers.length === 0) 
                return res.status(404).json({ error: 'no jobOffer found' })

            return res.status(200).json({ jobOffers: jobOffers });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    getCompanyJobOffersCount = async (req, res) => {
        const { companyId } = req.body;
        try {
            const jobOffersCount = await JobOffer.countDocuments({ company: companyId, job_status: true });
    
            if (jobOffersCount === 0) 
                return res.status(404).json({ error: 'No job offers found for the company' });
    
            return res.status(200).json({ jobOffersCount });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

module.exports = new JobOfferController();