const playerService = require('../services/playerService');

const getByTeam = async (req, res) => {
  try { res.json(await playerService.getByTeam(req.query.teamId)); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const create = async (req, res) => {
  try { res.status(201).json(await playerService.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const update = async (req, res) => {
  try { res.json(await playerService.update(req.params.id, req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const remove = async (req, res) => {
  try {
    await playerService.remove(req.params.id);
    res.status(204).send();
  } catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { getByTeam, create, update, remove };