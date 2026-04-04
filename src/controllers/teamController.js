const teamService = require('../services/teamService');

const getAll = async (req, res) => {
  try { res.json(await teamService.getAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try {
    const team = await teamService.getById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json(team);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const create = async (req, res) => {
  try { res.status(201).json(await teamService.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const update = async (req, res) => {
  try { res.json(await teamService.update(req.params.id, req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const remove = async (req, res) => {
  try {
    await teamService.remove(req.params.id);
    res.status(204).send();
  } catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { getAll, getById, create, update, remove };