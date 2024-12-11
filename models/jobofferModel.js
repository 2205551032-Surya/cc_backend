const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');
const Skill = require('./skillModel');
const Company = require('./companyModel');
const Regency = require('./regencyModel');

const JobOffer = sequelize.define('JobOffer', {
  id_job_offer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  req_skill: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_company: {
    type: DataTypes.INTEGER,
    references: {
      model: Company,
      key: 'id_company',
    },
  },
  id_regency: {
    type: DataTypes.INTEGER,
    references: {
      model: Regency,
      key: 'id_regency',
    },
  },
}, {
  tableName: 't_job_offer',
  timestamps: false,
});


JobOffer.belongsTo(Company, { foreignKey: 'id_company' });
JobOffer.belongsTo(Regency, { foreignKey: 'id_regency' });

module.exports = JobOffer;
