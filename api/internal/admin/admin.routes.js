const router = require('express').Router();

// Controller
const { getAdmins, getMe } = require('./admin.controller');

// Utils
const { jwtTokenPayload } = require('../../../lib/jwt');
const { isAuthorized } = require('../../../middlewares');

// Validation

// GET ../v1/internal/admin/
router.get('/', isAuthorized, async (req, res, next) => {
  try {
    const result = await getAdmins();
    const { _id } = await jwtTokenPayload(req.cookies.token);

    return res.status(200).json({ requester: _id, admins: result });
  } catch (error) {
    return next(error);
  }
});

// GET ../v1/internal/admin/me
router.get('/me', isAuthorized, async (req, res, next) => {
  try {
    const { _id } = await jwtTokenPayload(req.cookies.token);
    const me = await getMe(_id);

    return res.status(200).json(me);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
