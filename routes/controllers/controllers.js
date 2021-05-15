const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../model/index');

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).send(contacts);
  } catch (err) {
    throw err;
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(Number(contactId));

    if (!contact) throw new Error();

    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};

const add = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: contacts.length + 1,
      ...req.body,
    };

    addContact(newContact);

    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: 'missing required name field' });
  }
};

const remove = async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId);

    const contact = await getContactById(contactId);

    if (!contact) throw new Error();

    removeContact(contactId);

    res.status(200).json({ message: 'contact deleted' });
  } catch (err) {
    res.status(404).json({ message: 'contact not found' });
  }
};

const patch = async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId);

    const contact = await getContactById(contactId);

    if (!contact) throw new Error();

    const newContact = { ...contact, ...req.body };

    updateContact(contactId, newContact);

    res.status(200).json(newContact);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  patch,
};
