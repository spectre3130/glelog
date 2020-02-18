const express = require('express');
const router = express.Router();
const tag = require('./tag');
const jwtProvider = require('../auth/jwt.provider');

router.get('/', tag.aggregateTags);
router.get('/:username', tag.aggregateUserTags);

module.exports = router;