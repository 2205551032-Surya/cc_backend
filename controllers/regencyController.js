const Regency = require('../models/regencyModel');

// Create Regency
const createRegency = async (req, h) => {
  try {
    const { name, code } = req.payload;

    const regency = await Regency.create(req.payload);
    return h.response({
      status: 'success',
      message: 'Regency created successfully',
      data: regency,
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to create regency',
      error: error.message,
    }).code(500);
  }
};

// Get All Regencies
const getAllRegencies = async (req, h) => {
  try {
    const regencies = await Regency.findAll();

    if (regencies.length === 0) {
      return h.response({
        status: 'fail',
        message: 'No regencies found',
      }).code(404);
    }

    return h.response({
      status: 'success',
      message: 'Regencies retrieved successfully',
      data: regencies,
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve regencies',
      error: error.message,
    }).code(500);
  }
};

// Get Regency By ID
const getRegencyById = async (req, h) => {
  try {
    const { id_regency } = req.params;

    if (!id_regency) {
      return h.response({
        status: 'fail',
        message: 'Regency ID is required',
      }).code(400);
    }

    const regency = await Regency.findByPk(id_regency);
    if (regency) {
      return h.response({
        status: 'success',
        message: 'Regency retrieved successfully',
        data: regency,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Regency with ID ${id_regency} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve regency',
      error: error.message,
    }).code(500);
  }
};

// Update Regency
const updateRegency = async (req, h) => {
  try {
    const { id_regency } = req.params;

    if (!id_regency) {
      return h.response({
        status: 'fail',
        message: 'Regency ID is required',
      }).code(400);
    }

    const [updated] = await Regency.update(req.payload, { where: { id_regency } });
    if (updated) {
      return h.response({
        status: 'success',
        message: `Regency with ID ${id_regency} updated successfully`,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Regency with ID ${id_regency} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to update regency',
      error: error.message,
    }).code(500);
  }
};

// Delete Regency
const deleteRegency = async (req, h) => {
  try {
    const { id_regency } = req.params;

    if (!id_regency) {
      return h.response({
        status: 'fail',
        message: 'Regency ID is required',
      }).code(400);
    }

    const deleted = await Regency.destroy({ where: { id_regency } });
    if (deleted) {
      return h.response({
        status: 'success',
        message: `Regency with ID ${id_regency} deleted successfully`,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Regency with ID ${id_regency} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to delete regency',
      error: error.message,
    }).code(500);
  }
};

module.exports = {
  createRegency,
  getAllRegencies,
  getRegencyById,
  updateRegency,
  deleteRegency,
};
