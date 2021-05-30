const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers');
const { validateForm, validateUpdate } = require('../validate/validate');

router.get('/', productsCtrl.getAll);

router.get('/:contactId', productsCtrl.getById);

router.post('/', validateForm, productsCtrl.add);

router.delete('/:contactId', productsCtrl.remove);

router.put('/:contactId', validateUpdate, productsCtrl.put);

router.patch(
  '/:contactId/favorite',
  validateUpdate,
  productsCtrl.updateStatusContact
);

module.exports = router;
