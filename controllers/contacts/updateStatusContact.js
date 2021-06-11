const { contacts: services } = require('../../services');

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    body.favorite = true;

    const options = {
      new: true,
    };

    const contact = await services.update(contactId, body, options);

    if (!contact) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing field favorite',
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    error.code = 404;
    error.message = 'Not found';

    next(error);
  }
};

module.exports = updateStatusContact;
