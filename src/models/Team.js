const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
  name:          { type: DataTypes.STRING, allowNull: false, unique: true },
  coach:         { type: DataTypes.STRING, allowNull: false },
  wins:          { type: DataTypes.INTEGER, defaultValue: 0 },
  draws:         { type: DataTypes.INTEGER, defaultValue: 0 },
  losses:        { type: DataTypes.INTEGER, defaultValue: 0 },
  pointsFor:     { type: DataTypes.INTEGER, defaultValue: 0 },
  pointsAgainst: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Team;