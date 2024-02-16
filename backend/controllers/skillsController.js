const Skill = require('../models/skill');

class SkillsController {
  searchSkill = async (req, res) => {
    try {
      // Get the string parameter from the route
      const searchSkill = req.params.searchSkill;

      const filteredSkills = await Skill.find({ skill: { $regex: new RegExp(searchSkill, 'i') } }, { "_id": false }).sort({skill:1});

      if (!filteredSkills || filteredSkills.length === 0) {
        return res.status(404).json({ error: 'No matching skill found' });
      }

      return res.status(200).json({ skills: filteredSkills });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

module.exports = new SkillsController();
