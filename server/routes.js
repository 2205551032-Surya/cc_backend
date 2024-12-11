const { createCompany, getAllCompanies, updateCompany, deleteCompany } = require('../controllers/companyController');
const {
  createJobOffer,
  getAllJobOffers,
  getJobOfferById,
  updateJobOffer,
  deleteJobOffer,
} = require('../controllers/jobofferController');
const { createRegency, getAllRegencies, updateRegency, deleteRegency } = require('../controllers/regencyController');
const { login, register} = require('../controllers/authController');




module.exports = [
  // Company Routes
  { method: 'POST', path: '/companies', handler: createCompany },
  { method: 'GET', path: '/companies', handler: getAllCompanies },
  { method: 'PUT', path: '/companies/{id_company}', handler: updateCompany },
  { method: 'DELETE', path: '/companies/{id_company}', handler: deleteCompany },

  // Job Offer Routes
  { method: 'POST', path: '/job-offers', handler: createJobOffer },
  { method: 'GET', path: '/job-offers', handler: getAllJobOffers },
  { method: 'GET', path: '/job-offers/{id_job_offer}', handler: getJobOfferById },
  { method: 'PUT', path: '/job-offers/{id_job_offer}', handler: updateJobOffer },
  { method: 'DELETE', path: '/job-offers/{id_job_offer}', handler: deleteJobOffer },

  // Regency Routes
  { method: 'POST', path: '/regencies', handler: createRegency },
  { method: 'GET', path: '/regencies', handler: getAllRegencies },
  { method: 'PUT', path: '/regencies/{id_regency}', handler: updateRegency },
  { method: 'DELETE', path: '/regencies/{id_regency}', handler: deleteRegency },

    // Login Pengguna
    {
      method: 'POST',
      path: '/login',
      handler: login,
    },
    // Register Pengguna
    {
      method: 'POST',
      path: '/register',
      handler: register,
    },
    
 
];
