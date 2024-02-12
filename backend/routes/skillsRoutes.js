const express = require('express');
const router = express.Router();
const SkillsController = require('../controllers/skillsController');

router.get('/searchSkills/:searchSkill?', SkillsController.searchSkill);

module.exports = router;
