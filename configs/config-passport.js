const passport = require('passport');
const passportJWT = require('passport-jwt');
require('dotenv').config();

const { User } = require('../model/');
const { SECRET_KEY } = process.env;

const { Strategy, ExtractJwt } = passportJWT;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
