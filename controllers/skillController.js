const Skill = require('../models/skillModel');

// Create Skill
const createSkill = async (req, h) => {
  try {
    const { name, description } = req.payload;


    const skill = await Skill.create(req.payload);
    return h.response({
      status: 'success',
      message: 'Skill created successfully',
      data: skill,
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to create skill',
      error: error.message,
    }).code(500);
  }
};

// Get All Skills
const getAllSkills = async (req, h) => {
  try {
    const skills = await Skill.findAll();

    if (skills.length === 0) {
      return h.response({
        status: 'fail',
        message: 'No skills found',
      }).code(404);
    }

    return h.response({
      status: 'success',
      message: 'Skills retrieved successfully',
      data: skills,
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve skills',
      error: error.message,
    }).code(500);
  }
};

// Get Skill By ID
const getSkillById = async (req, h) => {
  try {
    const { id_skill } = req.params;

    if (!id_skill) {
      return h.response({
        status: 'fail',
        message: 'Skill ID is required',
      }).code(400);
    }

    const skill = await Skill.findByPk(id_skill);
    if (skill) {
      return h.response({
        status: 'success',
        message: 'Skill retrieved successfully',
        data: skill,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Skill with ID ${id_skill} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve skill',
      error: error.message,
    }).code(500);
  }
};

// Update Skill
const updateSkill = async (req, h) => {
  try {
    const { id_skill } = req.params;

    if (!id_skill) {
      return h.response({
        status: 'fail',
        message: 'Skill ID is required',
      }).code(400);
    }

    const [updated] = await Skill.update(req.payload, { where: { id_skill } });
    if (updated) {
      return h.response({
        status: 'success',
        message: `Skill with ID ${id_skill} updated successfully`,
      }).code(200);
    } 
    else {
      return h.response({
        status: 'fail',
        message: `Skill with ID ${id_skill} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to update skill',
      error: error.message,
    }).code(500);
  }
};

// Delete Skill
const deleteSkill = async (req, h) => {
  try {
    const { id_skill } = req.params;

    if (!id_skill) {
      return h.response({
        status: 'fail',
        message: 'Skill ID is required',
      }).code(400);
    }

    const deleted = await Skill.destroy({ where: { id_skill } });
    if (deleted) {
      return h.response({
        status: 'success',
        message: `Skill with ID ${id_skill} deleted successfully`,
      }).code(204);
    } else {
      return h.response({
        status: 'fail',
        message: `Skill with ID ${id_skill} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to delete skill',
      error: error.message,
    }).code(500);
  }
};

module.exports = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
