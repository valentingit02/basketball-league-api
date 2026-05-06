const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  category:  { type: DataTypes.STRING, allowNull: false },
    teamId:    { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Player;