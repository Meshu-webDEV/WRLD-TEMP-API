const router = require('express').Router();

// Routes
const internal = require('./internal');
const WRLD = require('./WRLD/WRLD.routes');

// Internal API routes
router.use('/internal', internal);
router.use('/WRLD', WRLD);

// Public API routes

module.exports = router;
