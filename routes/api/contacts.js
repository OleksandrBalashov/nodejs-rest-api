const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { listContacts, getContactById } = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).send(contacts);
  } catch (err) {
    throw err;
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    res.status(200).send(contact);

    if (!contact) res.json({ message: 'Not found' });
  } catch (err) {
    throw err;
  }
});

router.post('/', async (req, res, next) => {
  const contacts = await getContactById(req.params.contactId);

  const createUserRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validContact = Joi.validate(req.body, createUserRules);

  contacts.push({
    ...validContact,
    id: contacts.length + 1,
  });

  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
