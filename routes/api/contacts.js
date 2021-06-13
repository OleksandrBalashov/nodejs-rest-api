const express = require('express');
const router = express.Router();
const { contactsCtrl } = require('../../controllers');
const { contacts: validate } = require('../middlewares/validate');

router.get('/', contactsCtrl.getAll);

router.get('/:contactId', contactsCtrl.getById);

router.post('/', validate.validateForm, contactsCtrl.add);

router.delete('/:contactId', contactsCtrl.remove);

router.put('/:contactId', validate.validateUpdate, contactsCtrl.put);

router.patch(
  '/:contactId/favorite',
  validate.validateUpdate,
  contactsCtrl.updateStatusContact
);

module.exports = router;
