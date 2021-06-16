const { users: services } = require('../../services');

const verificationToken = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await services.findUser({ verifyToken: verificationToken });

    if (!user) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }

    await services.findByIdAndUpdate(user._id, {
      verify: true,
      verifyToken: null,
    });

    res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verificationToken;
