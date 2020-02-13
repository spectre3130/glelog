const express = require('express');
const router = express.Router();
const user = require('./user');
const jwtProvider = require('../auth/jwt.provider');

router.get('/', jwtProvider.authenticate, user.getUser);
router.put('/', jwtProvider.authenticate, user.update);
router.delete('/', jwtProvider.authenticate, user.delete);
router.get('/:username', user.getUserByUsername);
router.get('/:username/check', user.checkUsername);
module.exports = router;

