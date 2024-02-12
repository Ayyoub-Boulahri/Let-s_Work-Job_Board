const mongoose = require('../db'); 

const jobOfferSchema = new mongoose.Schema({
    company: mongoose.Schema.Types.ObjectId,
    TITLE: String,
    GRADE: String,
    DESCRIPTION: String,
    JOB_TYPE: String,
    SALAIRE: Number,
    CURRENCY: String,
    pay_periode: String,
    DATE_PUBLICATION: { type: Date, default: Date.now },
    DELAIS_DEPOT: Date,
    JOB_STATUS: Boolean,
    ATTACHEMENTS: Array,
    SKILLS: Array,
    POSTULATIONS: [
      {
        EMPLOYEE: mongoose.Schema.Types.ObjectId,
        DATE_POSTULATIONS: { type: Date, default: Date.now },
        ATTACHEMENTS: Array,
        STATUS: String,
      }
    ]
  }, {
    versionKey: false 
  });

const JobOffer = mongoose.model('joboffer', jobOfferSchema);

module.exports = JobOffer;
