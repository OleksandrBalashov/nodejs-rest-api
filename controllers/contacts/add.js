const { contacts: services } = require('../../services');

const add = async (req, res, next) => {
  try {
    const { body } = req;

    const result = await services.add(body);

    if (!result) {
      throw new Error();
    }

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (err) {
    err.code = 400;
    err.message = 'missing required name field';

    next(err);
  }
};

module.exports = add;
