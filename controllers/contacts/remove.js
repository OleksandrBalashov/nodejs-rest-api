const { services } = require('../../services');

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await services.remove(contactId);

    if (!contact) throw new Error();

    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    });
  } catch (err) {
    err.code = 404;
    err.message = 'contact not found';

    next(err);
  }
};

module.exports = remove;
