const JobOffer = require('../models/jobofferModel');
const Company = require('../models/companyModel');
const Regency = require('../models/regencyModel');

// Create Job Offer
const createJobOffer = async (req, h) => {
  try {
    const { position, location, job_type, summary, req_skill, id_company, id_regency } = req.payload;

    // Validasi input
    if (!position || !id_company || !id_regency) {
      return h.response({
        status: 'fail',
        message: 'Position, id_company, and id_regency are required',
      }).code(400);
    }

    // Validasi foreign key
    const company = await Company.findByPk(id_company);
    const regency = await Regency.findByPk(id_regency);

    if (!company || !regency) {
      return h.response({
        status: 'fail',
        message: 'Invalid foreign key reference for company or regency',
      }).code(400);
    }

    // Buat job offer baru
    const jobOffer = await JobOffer.create(req.payload);
    return h.response({
      status: 'success',
      message: 'Job offer created successfully',
      data: jobOffer,
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to create job offer',
      error: error.message,
    }).code(500);
  }
};

const getAllJobOffers = async (req, h) => {
  try {
    const jobOffers = await JobOffer.findAll({
      include: [
        { model: Company, attributes: ['name_company'] },
        { model: Regency, attributes: ['regency_name'] },
      ],
    });

    if (jobOffers.length === 0) {
      return h.response({
        status: 'fail',
        message: 'No job offers found',
      }).code(404);
    }

    return h.response({
      status: 'success',
      message: 'Job offers retrieved successfully',
      data: jobOffers,
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve job offers',
      error: error.message,
    }).code(500);
  }
};

// Get Job Offer By ID
const getJobOfferById = async (req, h) => {
  try {
    const { id_job_offer } = req.params;

    if (!id_job_offer) {
      return h.response({
        status: 'fail',
        message: 'Job offer ID is required',
      }).code(400);
    }

    const jobOffer = await JobOffer.findByPk(id_job_offer, {
      include: [
        { model: Company, attributes: ['name_company'] },
        { model: Regency, attributes: ['regency_name'] },
      ],
    });

    if (jobOffer) {
      return h.response({
        status: 'success',
        message: 'Job offer retrieved successfully',
        data: jobOffer,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Job offer with ID ${id_job_offer} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve job offer',
      error: error.message,
    }).code(500);
  }
};




// Update Job Offer
const updateJobOffer = async (req, h) => {
  try {
    const { id_job_offer } = req.params;

    if (!id_job_offer) {
      return h.response({
        status: 'fail',
        message: 'Job offer ID is required',
      }).code(400);
    }

    const [updated] = await JobOffer.update(req.payload, { where: { id_job_offer } });

    if (updated) {
      return h.response({
        status: 'success',
        message: `Job offer with ID ${id_job_offer} updated successfully`,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Job offer with ID ${id_job_offer} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to update job offer',
      error: error.message,
    }).code(500);
  }
};


// Delete Job Offer
const deleteJobOffer = async (req, h) => {
  try {
    const { id_job_offer } = req.params;

    if (!id_job_offer) {
      return h.response({
        status: 'fail',
        message: 'Job offer ID is required',
      }).code(400);
    }

    const deleted = await JobOffer.destroy({ where: { id_job_offer } });

    if (deleted) {
      return h.response({
        status: 'success',
        message: `Job offer with ID ${id_job_offer} deleted successfully`,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Job offer with ID ${id_job_offer} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to delete job offer',
      error: error.message,
    }).code(500);
  }
};

module.exports = {
  createJobOffer,
  getAllJobOffers,
  getJobOfferById,
  updateJobOffer,
  deleteJobOffer,
};