const Company = require('../models/companyModel');

// Create Company
const createCompany = async (req, h) => {
  try {
    const { name_company, contact, since } = req.payload;

    // Buat data perusahaan
    const company = await Company.create(req.payload);
    return h.response({
      status: 'success',
      message: 'Company created successfully',
      data: company,
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to create company',
      error: error.message,
    }).code(500);
  }
};

// Get All Companies
const getAllCompanies = async (req, h) => {
  try {
    const companies = await Company.findAll();
    if (companies.length === 0) {
      return h.response({
        status: 'fail',
        message: 'No companies found',
      }).code(404);
    }
    return h.response({
      status: 'success',
      message: 'Companies retrieved successfully',
      data: companies,
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve companies',
      error: error.message,
    }).code(500);
  }
};

// Get Company By ID
const getCompanyById = async (req, h) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return h.response({
        status: 'fail',
        message: 'ID parameter is required',
      }).code(400);
    }

    const company = await Company.findByPk(id_company);
    if (company) {
      return h.response({
        status: 'success',
        message: 'Company retrieved successfully',
        data: company,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Company with ID ${id_company} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to retrieve company',
      error: error.message,
    }).code(500);
  }
};

// Update Company
const updateCompany = async (req, h) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return h.response({
        status: 'fail',
        message: 'ID parameter is required',
      }).code(400);
    }

    const [updated] = await Company.update(req.payload, { where: { id_company } });
    if (updated) {
      return h.response({
        status: 'success',
        message: `Company with ID ${id_company} updated successfully`,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Company with ID ${id_company} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to update company',
      error: error.message,
    }).code(500);
  }
};

// Delete Company
const deleteCompany = async (req, h) => {
  try {
    const { id_company } = req.params;

    if (!id_company) {
      return h.response({
        status: 'fail',
        message: 'ID parameter is required',
      }).code(400);
    }

    const deleted = await Company.destroy({ where: { id_company } });
    if (deleted) {
      return h.response({
        status: 'success',
        message: `Company with ID ${id_company} deleted successfully`,
      }).code(200);
    } else {
      return h.response({
        status: 'fail',
        message: `Company with ID ${id_company} not found`,
      }).code(404);
    }
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Failed to delete company',
      error: error.message,
    }).code(500);
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
