const JobOffer = require('../models/jobOffer')
const { ObjectId } = require('mongodb');
const CompanyController = require('./companyController');
const NotificationController = require('./notificationController');

class JobOfferController {
    getSomeJobOffers = async (req, res) => {
        const { project, skip, limit, searchTxt, filters } = req.body;
        try {
            var jobOffers = null
            if (filters && filters.date_publication) {
                var datePublication = new Date(filters.date_publication)
                delete filters.date_publication
                jobOffers = await JobOffer.aggregate([
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
                            job_status: true,
                            $or: [
                                { "company.company_name": { $regex: searchTxt, $options: 'i' } },
                                { title: { $regex: searchTxt, $options: 'i' } }
                            ],
                            date_publication: { $gte: datePublication },
                            ...filters
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
            } else {
                jobOffers = await JobOffer.aggregate([
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
                            job_status: true,
                            $or: [
                                { "company.company_name": { $regex: searchTxt, $options: 'i' } },
                                { title: { $regex: searchTxt, $options: 'i' } }
                            ],
                            ...filters
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
            }

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
        const { searchTxt, filters } = req.body;
        try {
            var count = null;

            if (filters && filters.date_publication) {
                var datePublication = new Date(filters.date_publication);
                delete filters.date_publication;
                count = await JobOffer.aggregate([
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
                            job_status: true,
                            $or: [
                                { "company.company_name": { $regex: searchTxt, $options: 'i' } },
                                { title: { $regex: searchTxt, $options: 'i' } }
                            ],
                            date_publication: { $gte: datePublication },
                            ...filters
                        }
                    },
                    {
                        $count: 'totalJobOffers'
                    }
                ]);
            } else {
                count = await JobOffer.aggregate([
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
                            job_status: true,
                            $or: [
                                { "company.company_name": { $regex: searchTxt, $options: 'i' } },
                                { title: { $regex: searchTxt, $options: 'i' } }
                            ],
                            ...filters
                        }
                    },
                    {
                        $count: 'totalJobOffers'
                    }
                ]);
            }

            if (Array.isArray(count) && count.length > 0) {
                return res.status(200).json({ totalJobOffers: count[0].totalJobOffers });
            } else {
                return res.status(200).json({ totalJobOffers: 1 }); // Return 0 if no results found
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };


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
        const { id, project, skip, limit, condition, searchFilter } = req.body;
        try {
            const jobOffers = await JobOffer.aggregate([
                {
                    $match: {
                        company: new ObjectId(id),
                        title: { $regex: searchFilter, $options: "i" },
                        ...condition
                    }
                },
                {
                    $addFields: {
                        numberOfPostulations: { $cond: { if: { $isArray: "$postulations" }, then: { $size: "$postulations" }, else: 0 } }
                    }
                },
                { $sort: { date_publication: -1 } },
                { $project: project },
                { $skip: skip },
                { $limit: limit },
            ])

            if (!jobOffers || jobOffers.length === 0)
                return res.status(404).json({ error: 'No job offers found' });

            return res.status(200).json({ jobOffers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getCompanyJobOffersCount = async (req, res) => {
        const { companyId, condition, searchFilter } = req.body;
        try {
            const jobOffersCount = await JobOffer.countDocuments({ ...condition, title: { $regex: searchFilter, $options: "i" }, });

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

            if (removePostulation.nModified === 0)
                return res.status(404).json({ message: 'Postulation not removed or Job Offer not found' })

            return res.status(200).json({ message: "Postulation removed successfully" })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    deleteJobOffer = async (req, res) => {
        const { jobOfferId } = req.body;
        try {
            const removeJob = await JobOffer.deleteOne({ _id: new ObjectId(jobOfferId) })

            if (removeJob.deletedCount === 0) {
                return res.status(404).json({ message: "Job Offer not found" });
            }

            return res.status(200).json({ message: "Job Offer deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    getJobOfferPostulations = async (req, res) => {
        const { jobOfferId, project, skip, limit, searchFilter, condition } = req.body;
        try {
            const postulations = await JobOffer.aggregate([
                { $match: { _id: new ObjectId(jobOfferId) } },
                { $unwind: "$postulations" },
                {
                    $lookup: {
                        from: "employees",
                        localField: "postulations.employee",
                        foreignField: "_id",
                        as: "employee"
                    }
                },
                { $unwind: "$employee" },
                {
                    $project: project
                },
                {
                    $match: {
                        $or: [
                            { "first_name": { $regex: searchFilter, $options: "i" } }, // Case-insensitive search by first_name
                            { "last_name": { $regex: searchFilter, $options: "i" } } // Case-insensitive search by last_name
                        ],
                        ...condition
                    }
                },
                { $sort: { date_postulation: 1 } },
                { $skip: skip },
                { $limit: limit }
            ]);

            if (!postulations || postulations.length === 0)
                return res.status(404).json({ message: "No postulation found" });

            return res.status(200).json({ postulations });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    getJobOfferPostulationsTotal = async (req, res) => {
        const { jobOfferId, searchFilter } = req.body;
        try {
            const postulationsCount = await JobOffer.aggregate([
                { $match: { _id: new ObjectId(jobOfferId) } },
                { $unwind: "$postulations" },
                {
                    $lookup: {
                        from: "employees",
                        localField: "postulations.employee",
                        foreignField: "_id",
                        as: "employee"
                    }
                },
                { $unwind: "$employee" },
                {
                    $match: {
                        $or: [
                            { "employee.first_name": { $regex: searchFilter, $options: "i" } }, // Case-insensitive search by first_name
                            { "employee.last_name": { $regex: searchFilter, $options: "i" } } // Case-insensitive search by last_name
                        ]
                    }
                },
                { $count: "totalPostulations" }
            ]);

            if (!postulationsCount || postulationsCount.length === 0)
                return res.status(404).json({ message: "No postulation found" });

            const totalPostulations = postulationsCount[0].totalPostulations;

            return res.status(200).json({ totalPostulations });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    changePostulationStatus = async (req, res, io, connectedUsers) => {
        const { jobOfferId, status, employeeIds, companyId } = req.body;
        try {
            let result;
            let ids;
            if (employeeIds !== "all") {
                result = await JobOffer.updateMany(
                    {
                        _id: new ObjectId(jobOfferId),
                        "postulations.employee": { $in: employeeIds.map(id => new ObjectId(id)) }
                    },
                    {
                        $set: {
                            "postulations.$[elem].status": status
                        }
                    },
                    {
                        arrayFilters: [{ "elem.employee": { $in: employeeIds.map(id => new ObjectId(id)) } }]
                    }
                );

                ids = employeeIds;
            }
            else {
                result = await JobOffer.updateMany(
                    {
                        _id: new ObjectId(jobOfferId),
                    },
                    {
                        $set: {
                            "postulations.$[elem].status": status
                        }
                    },
                    {
                        arrayFilters: [{ "elem.employee": { $exists: true } }] // Match any postulation with employee field
                    }
                );
                const employees = await JobOffer.find({ _id: jobOfferId }, { "postulations.employee": 1 });
                ids = employees.map(jobOffer => jobOffer.postulations.map(postulation => postulation.employee));
            }

            const { company_photo } = await CompanyController.getCompanyNameAndPhoto(companyId);

            const statusTxt = status == "Accept" ? "Accepted" : "Rejected"
            for (var i = 0; i < ids.length; i++) {
                let socketId = connectedUsers[ids[i]];
                const notification = await NotificationController.createNotification(companyId, "company", ids[i], "employee", "Your postulation was " + statusTxt + " in this Job", "/jobs/job/" + jobOfferId);
                io.to(socketId).emit('sendNotification', {
                    _id: notification._id,
                    photo: company_photo,
                    message: notification.message,
                    read: false,
                    notification_link: notification.notification_link,
                    created_at: notification.created_at
                });
            }

            if (result.ok)
                return res.status(200).json({ message: "Postulations status updated successfully" });

            return res.status(404).json({ message: "Job offer or postulations not found" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    insertJobOffer = async (req, res, io, connectedUsers) => {
        try {
            const { jobOffer } = req.body;
            const newJobOffer = new JobOffer(jobOffer);
            const savedJobOffer = await newJobOffer.save();

            const jobOfferId = savedJobOffer._id; // Obtain the ID of the saved job offer
            const followersIds = await CompanyController.getAllFollowersIds(jobOffer.company);
            const { company_name, company_photo } = await CompanyController.getCompanyNameAndPhoto(jobOffer.company);


            for (let i = 0; i < followersIds.length; i++) {
                let socketId = connectedUsers[followersIds[i]];
                const notification = await NotificationController.createNotification(jobOffer.company, "company", followersIds[i], "employee", company_name + " has published a new job offer", "/jobs/job/" + jobOfferId);
                io.to(socketId).emit('sendNotification', {
                    _id: notification._id,
                    photo: company_photo,
                    message: notification.message,
                    read: false,
                    notification_link: notification.notification_link,
                    created_at: notification.created_at
                });
            }

            return res.status(201).json(savedJobOffer);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };


    updateJobOfferInfos = async (req, res) => {
        const { newInfos, jobOfferId } = req.body;
        try {
            const updateResult = await JobOffer.updateOne(
                { _id: jobOfferId },
                { $set: newInfos }
            );


            if (updateResult.nModified === 0)
                return res.status(404).json({ message: 'job Offer not founf' })
            return res.status(200).json({ message: 'update job offer infos successfull' })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}

module.exports = new JobOfferController();