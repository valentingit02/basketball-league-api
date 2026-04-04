const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
  date:         { type: DataTypes.DATEONLY, allowNull: false },
  time:         { type: DataTypes.TIME, allowNull: false },
  location:     { type: DataTypes.STRING, allowNull: false },
  localScore:   { type: DataTypes.INTEGER, defaultValue: null },
  visitorScore: { type: DataTypes.INTEGER, defaultValue: null },
  played:       { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Match;