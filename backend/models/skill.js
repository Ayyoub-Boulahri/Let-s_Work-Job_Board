const mongoose = require('../db'); 

const skillSchema = new mongoose.Schema({
  skill: String
}, {
  versionKey: false
});

const Skill = mongoose.model('skill', skillSchema);

module.exports = Skill;
