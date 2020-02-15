const express = require('express');
const router = express.Router();
const tag = require('./tag');
const jwt = require('../auth/jwt.provider');

router.get('/', tag.aggregateTags);
router.get('/:username', jwt.authenticate, tag.aggregateUserTags);

module.exports = router;