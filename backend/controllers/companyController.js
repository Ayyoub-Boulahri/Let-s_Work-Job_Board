const Company = require('../models/company');
const { ObjectId } = require('mongodb');

class CompanyController {
    insertCompany = async (req, res) => {
        try {
            const {
                companyName,
                phoneNumber,
                country,
                city,
                address,
                industry,
                foundedYear,
                size,
                email,
                password,
                description,
                file,
                profilePhoto,
                company_cover,
            } = req.body;

            const photoBuffer = Buffer.from(profilePhoto, 'base64');
            const coverBuffer = Buffer.from(company_cover, 'base64');
            const fileBuffer = Buffer.from(file.blobObj, 'base64');

            const newCompany = new Company({
                company_email: email,
                city,
                country,
                industry,
                password,
                company_name: companyName,
                description,
                company_phone: phoneNumber,
                certificat: {
                    file_name: file.name,
                    file: fileBuffer,
                },
                isApproved: false,
                address,
                company_photo: photoBuffer,
                company_cover: coverBuffer,
                founded_year: foundedYear,
                size,
                followers: [],
            });

            const savedCompany = await newCompany.save();
            res.status(201).json(savedCompany);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    getAllEmails = async (req, res) => {
        try {
            // Fetch all companies from the database
            const companies = await Company.find({}, { company_email: 1 }).lean();

            // Extract email addresses from the employee documents
            const emails = companies.map(company => company.company_email);

            // Return the list of emails in the response
            return res.status(200).json({ emails });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getCompanyByEmail = async (req, res) => {
        try {
            const { email } = req.body;
            const companyInfos = await Company.findOne({ company_email: email }, { followers: 0 }).lean();
            if (!companyInfos)
                return res.status(404).json({ message: 'Company not found' });

            const profilePhoto = companyInfos.company_photo.toString('base64');
            const coverPhoto = companyInfos.company_cover.toString('base64');

            companyInfos.company_photo = profilePhoto
            companyInfos.company_cover = coverPhoto

            return res.status(200).json(companyInfos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    deleteCompany = async (req, res) => {
        try {
            const { _id } = req.body;
            const deleteResult = await Company.deleteOne({ _id: _id });

            if (deleteResult.deletedCount === 0) {
                return res.status(404).json({ message: "Company not found" });
            }

            res.status(200).json({ message: "Company deleted successfully" });
        } catch (error) {
            console.error("Error deleting company:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    getSomeCompanies = async (req, res) => {
        try {
            const { project, skip, limit } = req.body;

            const companies = await Company.find({}, project)
                .skip(parseInt(skip))
                .limit(parseInt(limit)).lean();

            for (let i = 0; i < companies.length; i++) {
                const base64Photo = companies[i].company_photo.toString('base64');
                companies[i].company_photo = base64Photo;
            }


            if (!companies || companies.length === 0) {
                return res.status(404).json({ error: 'No company found' });
            }

            return res.status(200).json({ companies: companies });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getFollowersNumber = async (req, res) => {
        try {
            const { id } = req.query;
            const companyId = new ObjectId(id)
            const result = await Company.aggregate([
                {
                    $match: { _id: companyId }
                },
                {
                    $project: {
                        numberOfFollowers: { $size: "$followers" },
                        _id: 0
                    }
                }
            ]);
            if (!result || result.length === 0)
                return res.status(404).json({ error: 'No company found' });


            return res.status(200).json({ numberOfFollowers: result[0].numberOfFollowers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getTotalCompanies = async (req, res) => {
        try {
            const count = await Company.countDocuments({ isApproved: true });
            return res.status(200).json({ totalCompanies: count });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getCompanyById = async (req, res) => {
        try {
            const { id } = req.body;
            const company_id = new ObjectId(id);
            const companyInfos = await Company.aggregate([
                {
                    $match: {
                        _id: company_id
                    }
                },
                {
                    $addFields: {
                        followersCount: { $size: "$followers" }
                    }
                },
                {
                    $project: {
                        certificat: 0,
                        followers: 0
                    }
                }
            ]);

            if (!companyInfos || companyInfos.length === 0)
                return res.status(404).json({ message: 'Company not found' });

            const companyInfo = companyInfos[0];

            const profilePhoto = companyInfo.company_photo.toString('base64');
            const coverPhoto = companyInfo.company_cover.toString('base64');

            companyInfo.company_photo = profilePhoto;
            companyInfo.company_cover = coverPhoto;

            return res.status(200).json({ companyInfos: companyInfo });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getSuggestionsByIndustry = async (req, res) => {
        const { industry, idExclu } = req.query;
        const company_id = new ObjectId(idExclu)

        try {
            const suggestions = await Company.aggregate([
                {
                    $match: {
                        industry: industry,
                        _id: { $ne: company_id }
                    }
                },
                { $sample: { size: 5 } },
                {
                    $project: {
                        _id: 1,
                        company_name: 1,
                        company_photo: 1,
                        city: 1,
                        country: 1,
                        followersCount: { $size: "$followers" }
                    }
                }
            ]);

            if (!suggestions || suggestions.length === 0)
                return res.status(404).json({ error: 'No companies found for the specified industry' });

            for (var i = 0; i < suggestions.length; i++) {
                const profilePhoto = suggestions[i].company_photo.toString('base64');
                suggestions[i].company_photo = profilePhoto
            }
            return res.status(200).json({ suggestions });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    addFollower = async (req, res) => {
        try {
            const { company_id, employee_id } = req.body;
            const followResult = await Company.updateOne(
                { _id: company_id },
                {
                    $push: {
                        followers: {
                            employee: employee_id,
                        }
                    }
                }
            )
            if (followResult.nModified === 0)
                return res.status(404).json({ message: "company not found or follower not add" });

            return res.status(200).json({ message: "follow successfull" })
        } catch (error) {
            console.error("Error follow: " + error)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    removeFollower = async (req, res) => {
        try {
            const { company_id, employee_id } = req.body;
            const unfollowResult = await Company.updateOne(
                { _id: company_id },
                {
                    $pull: {
                        followers: { employee: employee_id }
                    }
                }
            );

            if (unfollowResult.nModified === 0)
                return res.status(404).json({ message: "Company not found or follower not removed" });

            return res.status(200).json({ message: "Follower successfully removed" });
        } catch (error) {
            console.error("Error removing follower: " + error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }


    isFollower = async (req, res) => {
        try {
            const { company_id, employee_id } = req.body;
            const company = await Company.findOne({
                _id: company_id,
                "followers.employee": employee_id
            });

            if (!company)
                return res.status(404).json({ message: "Not a follower" });
            else
                return res.status(200).json({ message: "He is a follower" });
        } catch (error) {
            console.error("Error checking follower: " + error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    updateCompanyInfos = async (req, res) => {
        try {
            const { _id, infos } = req.body;
            const updateResult = await Company.updateOne(
                { _id: _id },
                { $set: infos }
            );

            if (updateResult.nModified === 0) {
                return res.status(404).json({ message: "Company not found" });
            }

            res.status(200).json({ message: "infos updated successfully" });
        } catch (error) {
            console.error("Error updating company infos:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    updateCompanyProfilePhoto = async (req, res) => {
        try {
            const { _id, company_photo } = req.body;

            // Convert base64 string to buffer
            const photoBuffer = Buffer.from(company_photo, 'base64');

            // Update profile photo for the employee
            const updateResult = await Company.updateOne(
                { _id: _id }, // Filter by _id
                { $set: { "company_photo": photoBuffer } }
            );

            if (updateResult.nModified === 0) {
                return res.status(404).json({ message: "Company not found or profile photo not updated" });
            }

            return res.status(200).json({ message: "Profile photo updated successfully" });
        } catch (error) {
            console.error("Error updating prfile photo:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    updateCompanyCoverPhoto = async (req, res) => {
        try {
            const { _id, company_cover } = req.body;

            // Convert base64 string to buffer
            const photoBuffer = Buffer.from(company_cover, 'base64');

            // Update cover photo for the employee
            const updateResult = await Company.updateOne(
                { _id: _id }, // Filter by _id
                { $set: { "company_cover": photoBuffer } }
            );

            if (updateResult.nModified === 0) {
                return res.status(404).json({ message: "Company not found or cover photo not updated" });
            }

            return res.status(200).json({ message: "Cover photo updated successfully" });
        } catch (error) {
            console.error("Error updating cover photo:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    getCompanyFollowers = async (req, res) => {
        const { companyId, skip, limit } = req.body;
        try {
            const company = await Company.aggregate([
                { $match: { _id: new ObjectId(companyId) } },
                { $unwind: "$followers" }, 
                { $skip: skip }, 
                { $limit: limit }, 
                {
                    $lookup: {
                        from: "employees",
                        localField: "followers.employee",
                        foreignField: "_id",
                        as: "followerDetails"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        follower: {
                            $arrayElemAt: ["$followerDetails", 0] 
                        }
                    }
                },
                {
                    $project: {
                        _id: "$follower._id",
                        profilePhoto: "$follower.profilePhoto",
                        first_name: "$follower.first_name",
                        last_name: "$follower.last_name",
                        email: "$follower.email",
                    }
                }
            ]);

            if (!company || company.length === 0) {
                return res.status(404).json({ message: "Company not found" });
            }

            for(var i = 0; i < company.length; i++) {
                let followerPhoto = company[i].profilePhoto.toString('base64');
                company[i].profilePhoto = followerPhoto
            }

            return res.status(200).json({ followers: company });
        } catch (error) {
            console.error("Error fetching company followers:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

}

module.exports = new CompanyController();
