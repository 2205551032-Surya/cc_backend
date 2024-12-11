const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');

const Regency = sequelize.define('Regency', {
  id_regency: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  regency_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 't_regency',
  timestamps: false,
});

module.exports = Regency;
