const matchService = require('../services/matchService');

const getAll = async (req, res) => {
  try { res.json(await matchService.getAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try {
    const match = await matchService.getById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(match);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create = async (req, res) => {
  try { res.status(201).json(await matchService.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const update = async (req, res) => {
  try { res.json(await matchService.update(req.params.id, req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const remove = async (req, res) => {
  try {
    await matchService.remove(req.params.id);
    res.status(204).send();
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const loadResult = async (req, res) => {
  try {
    const { localScore, visitorScore } = req.body;
    if (localScore === undefined || visitorScore === undefined)
      return res.status(400).json({ error: 'localScore y visitorScore son requeridos' });
    res.json(await matchService.loadResult(req.params.id, localScore, visitorScore));
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const getStandings = async (req, res) => {
  try { res.json(await matchService.getStandings()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const getByTeam = async (req, res) => {
  try { res.json(await matchService.getByTeam(req.params.teamId)); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports = { getAll, getById, create, update, remove, loadResult, getStandings, getByTeam };