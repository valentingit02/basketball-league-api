const { Player, Team } = require('../models');

const getByTeam = (teamId) => Player.findAll({ where: { teamId } });

const create = async (data) => {
  const team = await Team.findByPk(data.teamId);
  if (!team) throw new Error('Equipo no encontrado');
  return Player.create(data);
};

const update = async (id, data) => {
  const player = await Player.findByPk(id);
  if (!player) throw new Error('Jugador no encontrado');
  return player.update(data);
};

const remove = async (id) => {
  const player = await Player.findByPk(id);
  if (!player) throw new Error('Jugador no encontrado');
  return player.destroy();
};

module.exports = { getByTeam, create, update, remove };