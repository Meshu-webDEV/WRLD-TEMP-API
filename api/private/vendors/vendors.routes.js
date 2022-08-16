const router = require('express').Router();

// Controller
const { signUp, signIn, getUsers, getMe } = require('./vendors.controller');

// Utils
const { jwtTokenPayload } = require('../../../lib/jwt');
const { isAuthorized } = require('../../../middlewares');
const { WEB_SERVER } = require('../../../lib/configs');

// Validation
const validate = require('../../../lib/validation');
const signinSchema = require('../../../lib/validation/schemas/signin');
const signupSchema = require('../../../lib/validation/schemas/signup');

// GET ../v1/users/
router.get('/', isAuthorized, async (req, res, next) => {
  try {
    const result = await getUsers();
    const { _id } = await jwtTokenPayload(req.cookies.token);

    return res.status(200).json({ requester: _id, users: result });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
