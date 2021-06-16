const express = require('express');
const router = express.Router();
const { usersCtrl } = require('../../controllers');
const { users: validate } = require('../middlewares/validate');
const { auth, upload } = require('../middlewares/auth');

router.post('/signup', validate.validateForm, usersCtrl.signUp);

router.post('/signin', validate.validateForm, usersCtrl.signIn);

router.post('/logout', auth, usersCtrl.signOut);

router.get('/current', auth, usersCtrl.getCurrent);

router.patch('/', auth, validate.validateFieldSubscr, usersCtrl.patchSubscr);

router.patch('/avatars', auth, upload.single('avatar'), usersCtrl.avatars);

router.get('/verify/:verificationToken', usersCtrl.verificationToken);

router.post('/verify', validate.validateEmailForVerify, usersCtrl.verify);

module.exports = router;
