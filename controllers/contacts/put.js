const { contacts: services } = require('../../services');

const put = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    const options = {
      new: true,
    };

    const contact = await services.update(contactId, body, options);

    if (!contact) throw new Error();

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

module.exports = put;
