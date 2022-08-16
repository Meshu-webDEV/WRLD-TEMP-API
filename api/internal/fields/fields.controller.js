/**
 * @type {import('mongoose').Model}
 */
const User = require('./fields.model');
const ERRORS = require('../../../lib/errors');
const { hashPassword, checkPassword } = require('../../../lib/utils');
const { jwtSign } = require('../../../lib/jwt');

function getVendors() {
  return new Promise(async (resolve, reject) => {
    try {
      const results = User.find({ is_deleted: false }, { __v: 0, password: 0 });

      resolve(results);
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

function getMe(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = User.findById(id, { __v: 0, password: 0 });

      resolve(user);
    } catch (error) {
      reject(ERRORS.UNAUTHORIZED);
    }
  });
}

module.exports = {
  getVendors,
  getMe,
};
