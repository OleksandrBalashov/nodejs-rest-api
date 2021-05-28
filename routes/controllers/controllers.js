const { Contact } = require('../../model');

const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({});

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

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

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

const add = async (req, res, next) => {
  try {
    const { body } = req;

    const result = await Contact.create({ ...body });

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

const remove = async (req, res, next) => {
  try {
    const { contactId: _id } = req.params;

    const contact = await Contact.findByIdAndRemove({ _id });

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

const patch = async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId);

    const contact = await getContactById(contactId);

    if (!contact) throw new Error();

    const newContact = { ...contact, ...req.body };

    updateContact(contactId, newContact);

    res.json({
      status: 'success',
      code: 200,
      data: { newContact },
    });
  } catch (err) {
    err.message = 'Not found';
    err.code = 404;

    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  patch,
};
