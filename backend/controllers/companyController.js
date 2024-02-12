const Company = require('../models/company');

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
            console.log("Successfully inserted company");
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
            const companyInfos = await Company.findOne({ company_email: email }).lean();
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
            console.log("enter delete comp")
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
    
}

module.exports = new CompanyController();
