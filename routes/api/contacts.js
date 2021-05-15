const express = require('express');
const router = express.Router();
const { productsActions } = require('../controllers');
const { validate } = require('../validateFrom');

router.get('/', productsActions.getAll);

router.get('/:contactId', productsActions.getById);

router.post('/', validate.validateForm, productsActions.add);

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
