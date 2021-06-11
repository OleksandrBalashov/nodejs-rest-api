const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers');
const { users: validate } = require('../validate');

router.post('/users/signup', validate.validateForm, usersCtrl.signUp);

router.post('/users/signin', usersCtrl.signIn);

module.exports = router;
