const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);

    return JSON.parse(contacts);
  } catch (err) {
    throw err;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contact = contacts.find(({ id }) => id === contactId);

    return contact;
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const newContacts = contacts.filter(({ id }) => id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (err) {}
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();

    contacts.push(body);

    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {}
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex(({ id }) => id === Number(contactId));

  contacts[idx] = { ...body };

  fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
