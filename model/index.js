const fs = require('fs/promises');
const path = require('path');
// const contacts = require('./contacts.json');

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

    const contact = contacts.find(({ id }) => id === Number(contactId));

    return contact;
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const contacts = await listContacts();

  console.log(contacts);

  contacts.push(body);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
