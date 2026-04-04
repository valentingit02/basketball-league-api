const { Team, Player } = require('../models');

const getAll = () => Team.findAll({ include: [{ model: Player, as: 'players' }] });

const getById = (id) => Team.findByPk(id, { include: [{ model: Player, as: 'players' }] });

const create = (data) => Team.create(data);

const update = async (id, data) => {
  const team = await Team.findByPk(id);
  if (!team) throw new Error('Equipo no encontrado');
  return team.update(data);
};

const remove = async (id) => {
  const team = await Team.findByPk(id);
  if (!team) throw new Error('Equipo no encontrado');
  return team.destroy();
};

module.exports = { getAll, getById, create, update, remove };