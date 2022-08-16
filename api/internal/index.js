const router = require('express').Router();

// sub-routes
const authentication = require('./authentication/authentication.routes');
const admin = require('./admin/admin.routes');
const vendors = require('./vendors/vendors.routes');

// API routes
router.use('/admin', admin);
router.use('/authentication', authentication);
router.use('/vendors', vendors);

module.exports = router;
