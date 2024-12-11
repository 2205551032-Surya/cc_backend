const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');

const Company = sequelize.define('Company', {
  id_company: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  industri: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  since: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 't_company',
  timestamps: false,
});

module.exports = Company;
