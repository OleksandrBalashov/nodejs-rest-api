const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../model/index');

const getAll = async (_, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
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
    const contact = await getContactById(Number(contactId));

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
    const contacts = await listContacts();
    const total = contacts.length;

    const { body } = req;

    const newContact = {
      id: total + 1,
      ...body,
    };

    addContact(newContact);

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { newContact },
    });
  } catch (err) {
    err.code = 400;
    err.message = 'missing required name field';

    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId);

    const contact = await getContactById(contactId);

    if (!contact) throw new Error();

    removeContact(contactId);

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
