/**
 * @type {import('mongoose').Model}
 */
const Vendor = require('./applications.model');
const ERRORS = require('../../../lib/errors');

function getApplications() {
  return new Promise(async (resolve, reject) => {
    try {
      const results = Vendor.find({ is_deleted: false }, { __v: 0, password: 0 });

      resolve(results);
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

module.exports = {
  getApplications,
};
