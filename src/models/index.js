const sequelize = require('../config/database');
const Admin  = require('./Admin');
const Team   = require('./Team');
const Player = require('./Player');
const Match  = require('./Match');

Team.hasMany(Player, { foreignKey: 'teamId', as: 'players' });
Player.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

Match.belongsTo(Team, { as: 'localTeam',   foreignKey: 'localTeamId' });
Match.belongsTo(Team, { as: 'visitorTeam', foreignKey: 'visitorTeamId' });

module.exports = { sequelize, Admin, Team, Player, Match };