const mongoose = require('../db'); 

const jobOfferSchema = new mongoose.Schema({
    company: mongoose.Schema.Types.ObjectId,
    title: String,
    grade: String,
    description: String,
    job_type: String,
    salary: Number,
    currency: String,
    pay_period: String,
    date_publication: { type: Date, default: Date.now },
    delais_depot: Date,
    job_status: Boolean,
    attachements: Array,
    skills: Array,
    postulations: [
      {
        employee: mongoose.Schema.Types.ObjectId,
        date_postulation: { type: Date, default: Date.now },
        attachements: Array,
        status: { type: String, default: "In Progress" },
      }
    ]
  }, {
    versionKey: false 
  });

const JobOffer = mongoose.model('joboffer', jobOfferSchema);

module.exports = JobOffer;
