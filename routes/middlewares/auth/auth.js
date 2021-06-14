const passport = require('passport');
const jwt = require('jsonwebtoken');
const { users: services } = require('../../../services');
require('dotenv').config();

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const { SECRET_KEY } = process.env;

  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
  }

  try {
    const [, token] = authorization.split(' ');

    jwt.verify(token, SECRET_KEY);

    const { _id } = jwt.decode(token);

    const user = await services.findUser({ _id });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'incorrect token',
    });
  }

  // passport.authenticate('user', { session: false }, (err, user) => {
  //   console.log('authenticate');
  //   if (!user || err) {
  //     res.status(401).json({
  //       status: 'error',
  //       code: 401,
  //       message: 'Not authorized',
  //     });
  //   }

  //   console.log(user);

  //   req.user = user;
  //   next();
  // });
};

module.exports = auth;
