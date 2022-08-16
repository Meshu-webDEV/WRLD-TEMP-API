const router = require('express').Router();

// Controller
const { getApplications } = require('./applications.controller');

// Utils
const { jwtTokenPayload } = require('../../../lib/jwt');
const { isAuthorized } = require('../../../middlewares');
const { WEB_SERVER } = require('../../../lib/configs');

// Validation
const validate = require('../../../lib/validation');

// GET ../v1/internal/vendors/
router.get('/', isAuthorized, async (req, res, next) => {
  try {
    const result = await getApplications();
    const { _id } = await jwtTokenPayload(req.cookies.token);

    return res.status(200).json({ requester: _id, applications: result });
  } catch (error) {
    return next(error);
  }
});

// POST ../v1/internal/vendors/
router.post('/', isAuthorized, async (req, res, next) => {
  try {
    const result = await getVendors();
    const { _id } = await jwtTokenPayload(req.cookies.token);

    return res.status(200).json({ requester: _id, users: result });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
