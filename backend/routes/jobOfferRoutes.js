const express = require('express')
const router = express.Router()
const JobOfferController = require('../controllers/jobOfferController')

module.exports = function (io, connectedUsers) {

    router.post('/', JobOfferController.getSomeJobOffers)
    router.get('/totalOpenJobOffers', JobOfferController.getTotalOpenJobOffers)
    router.get('/jobOfferById', JobOfferController.getJobOfferById)
    router.put('/postulation', JobOfferController.addPostulation)
    router.post('/employeePostulation', JobOfferController.getEmployeePostulation)
    router.put('/updateEmployeePostulation', JobOfferController.updateEmployeePostulation)
    router.post('/someCompanyJobOffers', JobOfferController.getSomeCompanyJobOffers)
    router.post('/companyJobOffersCount', JobOfferController.getCompanyJobOffersCount)
    router.post('/employeeJobRequests', JobOfferController.getEmployeeJobRequests)
    router.post('/employeeJobRequestsCount', JobOfferController.getEmployeeJobRequestCount)
    router.post('/update/removeEmployeeJobPostulation', JobOfferController.removeEmployeeJobPostulation)
    router.delete('/deleteJobOffer', JobOfferController.deleteJobOffer)
    router.post('/postulations', JobOfferController.getJobOfferPostulations)
    router.put('/changePostulationStatus', (req, res) => {JobOfferController.changePostulationStatus(req, res, io, connectedUsers);});
    router.post('/postulationsTotal', JobOfferController.getJobOfferPostulationsTotal)
    router.post('/insertJobOffer', (req, res) => {JobOfferController.insertJobOffer(req, res, io, connectedUsers);});
    router.put('/update/updateJobOfferInfos', JobOfferController.updateJobOfferInfos)

    return router;
};