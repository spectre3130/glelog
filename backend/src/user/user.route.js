const express = require('express');
const router = express.Router();
const user = require('./user');

router.get('/:username', user.getUser);
router.post('/', user.create);
router.put('/', user.update);
router.delete('/', user.delete);

module.exports = router;

