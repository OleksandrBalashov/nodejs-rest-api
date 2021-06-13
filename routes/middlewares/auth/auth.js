const passport = require('passport');
const jwt = require('jsonwebtoken');
const { users: services } = require('../../../services');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
  }

  try {
    const [, token] = authorization.split(' ');
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
  } catch (error) {}

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
