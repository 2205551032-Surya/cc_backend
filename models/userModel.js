const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');


const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 't_user',
  timestamps: true,
});

module.exports = User;
