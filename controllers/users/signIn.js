const { users: services } = require('../../services');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../../model');

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await services.findUser({ email });

    if (!user || !user.validPassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const { SECRET_KEY } = process.env;

    const payload = {
      _id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    res.cookie('nToken', token, { maxAge: 900000 });

    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signIn;
