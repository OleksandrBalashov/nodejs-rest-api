const signIn = require('./signIn');
const signUp = require('./signUp');
const signOut = require('./signOut');
const getCurrent = require('./getCurrent');
const patchSubscr = require('./pathSubscr');
const avatars = require('./avatars');
const verificationToken = require('./verificationToken');
const verify = require('./verify');

module.exports = {
  signIn,
  signUp,
  signOut,
  getCurrent,
  patchSubscr,
  avatars,
  verificationToken,
  verify,
};
