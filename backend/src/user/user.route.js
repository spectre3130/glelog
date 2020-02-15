const express = require('express');
const router = express.Router();
const user = require('./user');
const jwtProvider = require('../auth/jwt.provider');

router.get('/', user.getUser);
router.put('/', jwtProvider.authenticate, user.update);
router.delete('/', jwtProvider.authenticate, user.delete);
router.get('/check', jwtProvider.authenticate, user.checkUsername);
module.exports = router;

