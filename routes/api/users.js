const express = require('express');
const auth = require('../../middlewares/auth');
const { usersPostSchema } = require('../../validate');
const { signup, login, logout, current } = require('../../controller');

const router = express.Router();

router.post('/signup', usersPostSchema, signup);
router.post('/login', usersPostSchema, login);
router.get('/logout', auth, logout);
router.get('/current', auth, current);

module.exports = router;
