const { contacts: services } = require('../../services');

const getAll = async (req, res, next) => {
  const { query } = req;

  try {
    const result = await services.getAll(query);

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
