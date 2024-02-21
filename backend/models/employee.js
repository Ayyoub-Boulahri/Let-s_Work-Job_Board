const mongoose = require('../db'); // Adjust the path based on your project structure

const employeeSchema = new mongoose.Schema({
  cin: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  phone: String,
  date_of_birth: String,
  city: String,
  country: String,
  skills: Array,
  experiences: [
    {
      company: String,
      title: String,
      date_debut: String,
      date_fin: String,
      description: String
    }
  ],
  educations: [
    {
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
