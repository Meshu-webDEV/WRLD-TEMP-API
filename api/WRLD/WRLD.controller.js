/**
 * @type {import('mongoose').Model}
 */
const WRLD = require('./WRLD.model');
/**
 * @type {import('mongoose').Model}
 */
const AdminWRLD = require('./admin.WRLD.model');
const ERRORS = require('../../lib/errors');
const { hashPassword, checkPassword } = require('../../lib/utils');
const { jwtSign } = require('../../lib/jwt');

function getWrldData() {
  return new Promise(async (resolve, reject) => {
    try {
      const results = WRLD.find({ is_deleted: false }, { __v: 0, password: 0 });

      resolve(results);
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

function getById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await WRLD.findOne({ is_deleted: false, _id: id }, { __v: 0, password: 0 });

      if (!results) return resolve({ success: false, result: null });

      console.log('found:');
      console.log(results);
      resolve({ success: true, result: results });
    } catch (error) {
      console.log('not found?');
      reject(ERRORS.INTERNAL);
    }
  });
}

function newWrldData(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await new WRLD(data).save();

      resolve(result);
    } catch (error) {
      console.log('---- ERROR');
      reject(ERRORS.INTERNAL);
    }
  });
}

function newWrldAdmin(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const hashed_pw = await hashPassword(data.password);

      console.log(hashed_pw);

      const result = await new AdminWRLD({ ...data, password: hashed_pw }).save();

      resolve(result);
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

function getAdmin(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = AdminWRLD.findById(id, { __v: 0, password: 0 });

      resolve(user);
    } catch (error) {
      reject(ERRORS.UNAUTHORIZED);
    }
  });
}

function signIn(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const admin = await AdminWRLD.findOne({ username: data.username });

      // check if found
      if (!admin) return reject(ERRORS.UNAUTHORIZED);

      // check password
      const isMatching = await checkPassword(data.password, admin.password);

      if (!isMatching) return reject(ERRORS.INVALID_SIGNIN);

      // jwt sign
      const token = await jwtSign({ _id: admin._id });

      return resolve({ username: admin.username, token: token });
    } catch (error) {
      console.log(error);
      reject(ERRORS.INTERNAL);
    }
  });
}

module.exports = {
  getWrldData,
  newWrldAdmin,
  newWrldData,
  getAdmin,
  signIn,
  getById,
};
