const router = require('express').Router();

// Controller
const { getVendors } = require('./fields.controller');

// Utils
const { jwtTokenPayload } = require('../../../lib/jwt');
const { isAuthorized } = require('../../../middlewares');
const { WEB_SERVER } = require('../../../lib/configs');

// Validation
const validate = require('../../../lib/validation');
const signinSchema = require('../../../lib/validation/schemas/signin');
const signupSchema = require('../../../lib/validation/schemas/signup');

// GET ../v1/internal/vendors/
router.get('/', isAuthorized, async (req, res, next) => {
  try {
    const result = await getVendors();
    const { _id } = await jwtTokenPayload(req.cookies.token);

    return res.status(200).json({ requester: _id, vendors: result });
  } catch (error) {
    return next(error);
  }
});

// POST ../v1/internal/vendors/
router.post('/', isAuthorized, async (req, res, next) => {
  try {
    const result = await getVendors();
    const { _id } = await jwtTokenPayload(req.cookies.token);

    return res.status(200).json({ requester: _id, vendors: result });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
