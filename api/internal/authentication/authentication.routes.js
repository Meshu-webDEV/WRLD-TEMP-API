const router = require('express').Router();

// Controller
const { signUp, signIn } = require('./authentication.controller');

// Utils
const { WEB_SERVER } = require('../../../lib/configs');

// Validation
const validate = require('../../../lib/validation');
const signinSchema = require('../../../lib/validation/schemas/signin');
const signupSchema = require('../../../lib/validation/schemas/signup');

// POST ../v1/admin/signin
router.post('/signin', async (req, res, next) => {
  try {
    // Validate
    await validate(req.body, signinSchema);

    const { username, token } = await signIn(req.body);
    return res
      .status(200)
      .cookie('token', token, {
        secure: WEB_SERVER.ENV === 'production' ? true : false,
        httpOnly: WEB_SERVER.ENV === 'production' ? true : false,
        sameSite: 'none', //on production
        maxAge: 1000 * 60 * 60 * 24 * 14, // Two Weeks
      })
      .json({ username });
  } catch (error) {
    return next(error);
  }
});

// POST ../v1/admin/signup
router.post('/signup', async (req, res, next) => {
  try {
    // Validate
    await validate(req.body, signupSchema);

    const { username, token } = await signUp(req.body);

    return res
      .status(201)
      .cookie('token', token, {
        secure: WEB_SERVER.ENV === 'production' ? true : false,
        httpOnly: WEB_SERVER.ENV === 'production' ? true : false,
        sameSite: 'none', //on production
        maxAge: 1000 * 60 * 60 * 24 * 14, // Two Weeks
      })
      .json({ username });
  } catch (error) {
    return next(error);
  }
});

// POST ../v1/admin/signup
router.get('/signout', async (req, res, next) => {
  try {
    return res.status(200).clearCookie('token').json({ status: 1, message: 'Successfully signed out.' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
