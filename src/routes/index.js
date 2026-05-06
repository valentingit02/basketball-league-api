const router = require('express').Router();

router.use('/auth',    require('./authRoutes'));
router.use('/teams',   require('./teamRoutes'));
router.use('/players', require('./playerRoutes'));
router.use('/matches', require('./matchRoutes'));

module.exports = router;