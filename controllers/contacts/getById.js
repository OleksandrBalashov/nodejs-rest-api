const { services } = require('../../services');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await services.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (err) {
    err.message = 'Not found';
    err.code = 404;

    next(err);
  }
};

module.exports = getById;
