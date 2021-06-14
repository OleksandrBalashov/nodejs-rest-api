const { User } = require('../../model');
const { users: services } = require('../../services');

const signUp = async (req, res, next) => {
  const { body } = req;

  try {
    const user = await services.findUser({ email: body.email });

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }

    const { email, subscription } = await services.addUser(body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription,
        },
      },
      message: 'user add',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
