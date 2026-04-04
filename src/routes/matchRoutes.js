const router = require('express').Router();
const ctrl   = require('../controllers/matchController');
const auth   = require('../middleware/auth');

router.get('/standings',        ctrl.getStandings);
router.get('/team/:teamId',     ctrl.getByTeam);
router.get('/',                 ctrl.getAll);
router.get('/:id',              ctrl.getById);
router.post('/',                auth, ctrl.create);
router.put('/:id',              auth, ctrl.update);
router.delete('/:id',           auth, ctrl.remove);
router.post('/:id/result',      auth, ctrl.loadResult);

module.exports = router;