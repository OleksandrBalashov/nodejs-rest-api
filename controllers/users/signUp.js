const { users: services } = require('../../services');
const gravatar = require('gravatar');

const signUp = async (req, res, next) => {
  const { body } = req;

  try {
    const result = await services.findUser({ email: body.email });

    if (result) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }

    body.avatarURL = gravatar.profile_url(body.email);

    const { email, subscription, avatarURL } = await services.addUser(body);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
        },
      },
      message: 'user add',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
