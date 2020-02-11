const express = require('express');
const router = express.Router();
const user = require('./user');
const jwtProvider = require('../auth/jwt.provider');
const s3 = require('../config/s3');

router.get('/', jwtProvider.authenticate, user.getUser);
router.put('/', jwtProvider.authenticate, user.update);
router.delete('/', jwtProvider.authenticate, user.delete);
router.get('/:username', user.getUserByUsername);
router.post('/:username/avatar', jwtProvider.authenticate, s3.avatar.single('avatar'), user.changeAvatar);

module.exports = router;

