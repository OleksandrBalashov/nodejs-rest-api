const {
  listContacts,
  getContactById,
  addContact,
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
    const contact = await getContactById(req.params.contactId);

    res.status(200).send(contact);

    if (!contact) res.json({ message: 'Not found' });
  } catch (err) {
    throw err;
  }
};

const add = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      ...req.body,
      id: contacts.length + 1,
    };

    addContact(newContact);

    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: 'fuck' });
  }

  //
};

module.exports = {
  getAll,
  getById,
  add,
};
