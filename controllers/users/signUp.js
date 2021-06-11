const { users: services } = require('../../services');

const signUp = async (req, res, next) => {
  const { email, password } = req;

  try {
    const user = await services.findUser({ email });

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }

    const newUser = await services.addUser(body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { user: newUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
