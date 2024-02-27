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

            for (let i = 0; i < attachements.length; i++) {
                let att = Buffer.from(attachements[i].file, 'base64');
                attachements[i].file = att;
            }

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
                return res.status(404).json({ message: "Job offer not found or postulation not completed" });

            return res.status(200).json({ message: "Postulation successful" })
        } catch (error) {
            console.error("Error postulation: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }


    updateEmployeePostulation = async (req, res) => {
        try {
            const { jobId, employeeId, attachements } = req.body;

            for (let i = 0; i < attachements.length; i++) {
                let att = Buffer.from(attachements[i].file, 'base64');
                attachements[i].file = att;
            }

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
                    { "postulations.employee": new ObjectId(employeeId) }
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
        const { id, project, skip, limit, condition } = req.body;
        try {
            const jobOffers = await JobOffer.find(condition, project).skip(skip).limit(limit)

            if (!jobOffers || jobOffers.length === 0)
                return res.status(404).json({ error: 'no jobOffer found' })

            return res.status(200).json({ jobOffers: jobOffers });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    getCompanyJobOffersCount = async (req, res) => {
        const { companyId, condition } = req.body;
        try {
            const jobOffersCount = await JobOffer.countDocuments(condition);

            if (jobOffersCount === 0)
                return res.status(404).json({ error: 'No job offers found for the company' });

            return res.status(200).json({ jobOffersCount });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getEmployeeJobRequests = async (req, res) => {
        const { employeeId, skip, limit, condition, searchFilter } = req.body;
        try {
            const result = await JobOffer.aggregate([
                {
                    $match: {
                        "postulations.employee": new ObjectId(employeeId),
                        ...condition
                    }
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "company",
                        foreignField: "_id",
                        as: "companyDetails"
                    }
                },
                {
                    $unwind: "$companyDetails" // Unwind the array to access company details
                },
                {
                    $addFields: {
                        company_name: "$companyDetails.company_name"
                    }
                },
                {
                    $match: {
                        $or: [
                            { title: { $regex: searchFilter, $options: "i" } }, // Match title containing searchFilter
                            { company_name: { $regex: searchFilter, $options: "i" } } // Match company_name containing searchFilter
                        ]
                    }
                },
                {
                    $addFields: {
                        postulation: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: "$postulations",
                                        as: "postulation",
                                        cond: { $eq: ["$$postulation.employee", new ObjectId(employeeId)] }
                                    }
                                },
                                0
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        "company._id": "$companyDetails._id",
                        "company.company_name": "$companyDetails.company_name",
                        "company.city": "$companyDetails.city",
                        "company.country": "$companyDetails.country",
                        "company.company_photo": "$companyDetails.company_photo",
                        job_status: 1,
                        title: 1,
                        date_postulation: "$postulation.date_postulation",
                        Offer_status: "$postulation.status",
                        postulations: 1 // Retain the postulations field
                    }
                },
                {
                    $sort: {
                        date_postulation: -1 // Sort by date_postulation in descending order
                    }
                },
                {
                    $skip: parseInt(skip) || 0 // Skip documents based on the value of skip query parameter
                },
                {
                    $limit: parseInt(limit) || 10 // Limit the number of documents returned based on the value of limit query parameter, default to 10 if not provided
                }
            ]);

            if (!result || result.length === 0)
                return res.status(404).json({ error: 'no jobOffer found' })

            return res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getEmployeeJobRequestCount = async (req, res) => {
        const { employeeId, condition, searchFilter } = req.body;
        try {
            const result = await JobOffer.aggregate([
                {
                    $match: {
                        "postulations.employee": new ObjectId(employeeId),
                        ...condition
                    }
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "company",
                        foreignField: "_id",
                        as: "companyDetails"
                    }
                },
                {
                    $addFields: {
                        company_name: { $arrayElemAt: ["$companyDetails.company_name", 0] }
                    }
                },
                {
                    $match: {
                        $or: [
                            { title: { $regex: searchFilter, $options: "i" } }, // Match title containing searchFilter
                            { company_name: { $regex: searchFilter, $options: "i" } } // Match company_name containing searchFilter
                        ]
                    }
                },
                {
                    $count: "totalJobOffers"
                }
            ]);

            if (!result || result.length === 0) {
                return res.status(404).json({ error: 'no jobOffer found' });
            }

            const totalJobOffers = result[0].totalJobOffers;

            return res.status(200).json({ totalJobOffers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    
    removeEmployeeJobPostulation = async (req, res) => {
        const { jobOfferId, employeeId } = req.body;
        try {
            const removePostulation = await JobOffer.updateOne(
                { _id: jobOfferId },
                { $pull: { postulations: { employee: new ObjectId(employeeId) } } }
            )

            if(removePostulation.nModified === 0) 
                return res.status(404).json({ message: 'Postulation not removed or Job Offer not found' })

            return res.status(200).json({ message: "Postulation removed successfully" })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new JobOfferController();