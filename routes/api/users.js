const express = require('express');
const { usersPostSchema } = require('../../validate');

const router = express.Router();

router.post('/signup', usersPostSchema);
router.post('/login', usersPostSchema);

module.exports = router;
