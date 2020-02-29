const express = require('express');
const router = express.Router();
const user = require('./user');
const auth = require('../auth/auth');

router.get('/', user.getUser);

router.put('/', auth.authenticate, user.update);

router.delete('/', auth.authenticate, user.delete);

router.get('/check', auth.authenticate, user.checkUsername);

module.exports = router;

