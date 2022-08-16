/**
 * @type {import('mongoose').Model}
 */
const Admin = require('./admin.model');
const ERRORS = require('../../../lib/errors');

function getMe(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = Admin.findById(id, { __v: 0, password: 0 });

      resolve(user);
    } catch (error) {
      reject(ERRORS.UNAUTHORIZED);
    }
  });
}

function getAdmins() {
  return new Promise(async (resolve, reject) => {
    try {
      const results = Admin.find({ is_deleted: false }, { __v: 0, password: 0 });

      resolve(results);
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

module.exports = {
  getMe,
  getAdmins,
};
