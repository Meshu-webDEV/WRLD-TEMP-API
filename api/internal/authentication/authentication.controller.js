/**
 * @type {import('mongoose').Model}
 */
const Admin = require('../admin/admin.model');
const ERRORS = require('../../../lib/errors');
const { hashPassword, checkPassword } = require('../../../lib/utils');
const { jwtSign } = require('../../../lib/jwt');

function signUp(data) {
  return new Promise(async (resolve, reject) => {
    try {
      // check if exist
      const userExist = await Admin.findOne({ username: data.username });

      if (userExist) return reject(ERRORS.USER_ALREADY_EXIST);

      // hash password
      const hashedPassword = await hashPassword(data.password);

      // save
      const user = await Admin.create({
        username: data.username,
        password: hashedPassword,
      });

      //@@TODO
      // DATE: 15/08/2022 | By: Meshari
      // Description: Expiration for jwt
      // jwt sign
      const token = await jwtSign({ _id: user._id });
      return resolve({ username: user.username, token: token });
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

function signIn(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Admin.findOne({ username: data.username });

      // check if found
      if (!user) return reject(ERRORS.UNAUTHORIZED);

      // check password
      const isMatching = await checkPassword(data.password, user.password);

      if (!isMatching) return reject(ERRORS.INVALID_SIGNIN);

      // jwt sign
      const token = await jwtSign({ _id: user._id });

      return resolve({ username: user.username, token: token });
    } catch (error) {
      reject(ERRORS.INTERNAL);
    }
  });
}

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

module.exports = {
  signUp,
  signIn,
  getMe,
};
