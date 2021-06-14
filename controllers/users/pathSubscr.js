const { users: services } = require('../../services');

const patchSubscr = async (req, res, next) => {
  const { _id } = req.user;
  const { body } = req;

  try {
    const { email, subscription } = await services.findByIdAndUpdate(_id, body);

    if (subscription !== body.subscription) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'something went wrong, try again.',
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    error.code = 400;
    error.message = 'something went wrong, try again.';
    next(error);
  }
};

module.exports = patchSubscr;
