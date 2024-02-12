const mongoose = require('../db'); // Adjust the path based on your project structure

const employeeSchema = new mongoose.Schema({
  cin: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  phone: String,
  date_of_birth: Date,
  city: String,
  country: String,
  skills: Array,
  experiences: [
    {
      id_experience: Number,
      company: String,
      title: String,
      date_debut: Date,
      date_fin: Date,
      description: String
    }
  ],
  educations: [
    {
      id_education: Number,
      degreeName: String,
      school: String,
      year: Number,
    }
  ],
  address: String,
  about: String,
  profilePhoto: Buffer,
  cv: Buffer,
  followings: [
    {
      company:mongoose.Schema.Types.ObjectId,
      date_follow: { type: Date, default: Date.now },
    }
  ]
}, {
  versionKey: false
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
