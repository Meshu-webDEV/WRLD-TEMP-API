const router = require('express').Router();

// Controller
const { getWrldData, newWrldData, newWrldAdmin, getAdmin, signIn, getById } = require('./WRLD.controller');

// Utils
const { jwtTokenPayload } = require('../../lib/jwt');
const { isAuthorized, isWrldAdmin } = require('../../middlewares');
const { WEB_SERVER } = require('../../lib/configs');
const errors = require('../../lib/errors');
const configs = require('../../lib/configs');
const { createUniqueId } = require('../../lib/utils');

// Validation
// const validate = require('../../lib/validation');

// POST ../v1/WRLD/
router.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.query).length) throw errors.MISSING_BODY;

    const result = await newWrldData(req.query);

    return res.status(200).json({ data: result });
  } catch (error) {
    return next(error);
  }
});

// GET ../v1/WRLD/
router.get('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.query).length) throw errors.MISSING_BODY;

    console.log('making data');

    const result = await newWrldData(req.query);

    console.log(result);
    console.log(__dirname);
    return res.render('processing', {
      SUCCESS_CHECK_URL: `WRLD/is-successful/?id=${result._id}`,
      SUCCESS_REDIRECT: configs.CLIENT.WRLD.WRLD_SUCCESS,
      FAILURE_REDIRECT: configs.CLIENT.WRLD.WRLD_FAIL,
    });

    return res.send('ok');
  } catch (error) {
    return next(error);
  }
});

// GET ../v1/WRLD/is-successful/?id=
router.get('/is-successful', async (req, res, next) => {
  try {
    if (!req.query.id) throw errors.MISSING_BODY;

    const result = await getById(req.query.id);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

// GET ../v1/WRLD/admin/get-data
router.get('/admin/get-data', isWrldAdmin, async (req, res, next) => {
  try {
    const result = await getWrldData();

    return res.status(200).json({ data: result });
  } catch (error) {
    return next(error);
  }
});

// POST ../v1/WRLD/admin
router.post('/admin/', async (req, res, next) => {
  try {
    const result = await newWrldAdmin(req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// POST ../v1/WRLD/admin/me
router.post('/admin/me', isWrldAdmin, async (req, res, next) => {
  try {
    const { _id } = await jwtTokenPayload(req.cookies.token);
    const me = await getAdmin(_id);

    return res.status(200).json(me);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// POST ../v1/WRLD/admin/signin
router.post('/admin/signin', async (req, res, next) => {
  try {
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

// POST ../v1/WRLD/admin/signup
router.get('/admin/signout', async (req, res, next) => {
  try {
    return res.status(200).clearCookie('token').json({ status: 1, message: 'Successfully signed out.' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
