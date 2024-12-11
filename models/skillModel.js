const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');

const Skill = sequelize.define('Skill', {
  id_skill: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  skill_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 't_skill',
  timestamps: false,
});

module.exports = Skill;
