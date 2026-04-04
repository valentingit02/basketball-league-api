const { Match, Team } = require('../models');
const { Op } = require('sequelize');

const getAll = () =>
  Match.findAll({
    include: [
      { model: Team, as: 'localTeam',   attributes: ['id', 'name'] },
      { model: Team, as: 'visitorTeam', attributes: ['id', 'name'] },
    ],
    order: [['date', 'ASC'], ['time', 'ASC']],
  });

const getById = (id) =>
  Match.findByPk(id, {
    include: [
      { model: Team, as: 'localTeam' },
      { model: Team, as: 'visitorTeam' },
    ],
  });

const create = (data) => Match.create(data);

const update = async (id, data) => {
  const match = await Match.findByPk(id);
  if (!match) throw new Error('Partido no encontrado');
  return match.update(data);
};

const remove = async (id) => {
  const match = await Match.findByPk(id);
  if (!match) throw new Error('Partido no encontrado');
  return match.destroy();
};

const loadResult = async (id, localScore, visitorScore) => {
  const match = await Match.findByPk(id, {
    include: [
      { model: Team, as: 'localTeam' },
      { model: Team, as: 'visitorTeam' },
    ],
  });
  if (!match) throw new Error('Partido no encontrado');
  if (match.played) throw new Error('El partido ya tiene resultado cargado');

  const local   = match.localTeam;
  const visitor = match.visitorTeam;

  if (localScore > visitorScore) {
    await local.increment({ wins: 1, pointsFor: localScore, pointsAgainst: visitorScore });
    await visitor.increment({ losses: 1, pointsFor: visitorScore, pointsAgainst: localScore });
  } else if (visitorScore > localScore) {
    await visitor.increment({ wins: 1, pointsFor: visitorScore, pointsAgainst: localScore });
    await local.increment({ losses: 1, pointsFor: localScore, pointsAgainst: visitorScore });
  } else {
    await local.increment({ draws: 1, pointsFor: localScore, pointsAgainst: visitorScore });
    await visitor.increment({ draws: 1, pointsFor: visitorScore, pointsAgainst: localScore });
  }

  return match.update({ localScore, visitorScore, played: true });
};

const getStandings = async () => {
  const teams = await Team.findAll();

  return teams
    .map((t) => ({
      id:            t.id,
      name:          t.name,
      played:        t.wins + t.draws + t.losses,
      wins:          t.wins,
      draws:         t.draws,
      losses:        t.losses,
      points:        t.wins * 3 + t.draws,
      pointsFor:     t.pointsFor,
      pointsAgainst: t.pointsAgainst,
      pointDiff:     t.pointsFor - t.pointsAgainst,
    }))
    .sort((a, b) => {
      if (b.points    !== a.points)    return b.points    - a.points;
      if (b.pointDiff !== a.pointDiff) return b.pointDiff - a.pointDiff;
      return b.pointsFor - a.pointsFor;
    })
    .map((t, i) => ({ position: i + 1, ...t }));
};

const getByTeam = (teamId) =>
  Match.findAll({
    where: { [Op.or]: [{ localTeamId: teamId }, { visitorTeamId: teamId }] },
    include: [
      { model: Team, as: 'localTeam',   attributes: ['id', 'name'] },
      { model: Team, as: 'visitorTeam', attributes: ['id', 'name'] },
    ],
    order: [['date', 'ASC']],
  });

module.exports = { getAll, getById, create, update, remove, loadResult, getStandings, getByTeam };