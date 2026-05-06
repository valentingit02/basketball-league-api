const router = require('express').Router();
const auth = require('../middleware/auth'); // ← importás el middleware

router.use('/auth',    require('./authRoutes'));         // login no se protege
router.use('/teams',   auth, require('./teamRoutes'));   // ← protegido
router.use('/players', auth, require('./playerRoutes')); // ← protegido
router.use('/matches', auth, require('./matchRoutes'));  // ← protegido

module.exports = router;