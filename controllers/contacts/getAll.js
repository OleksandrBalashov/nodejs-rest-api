const { contacts: services } = require('../../services');

const getAll = async (_, res, next) => {
  try {
    const result = await services.getAll({});

    if (!result) {
      throw new Error();
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (err) {
    err.message = 'Not found';
    err.code = 404;

    next(err);
  }
};

module.exports = getAll;
