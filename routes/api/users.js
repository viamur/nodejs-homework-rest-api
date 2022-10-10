const express = require('express');
const auth = require('../../middlewares/auth');
const { usersPostSchema, usersSubscSchema } = require('../../validate');
const { signup, login, logout, current, subscription, avatars } = require('../../controller');

const router = express.Router();

router.post('/signup', usersPostSchema, signup);
router.post('/login', usersPostSchema, login);
router.get('/logout', auth, logout);
router.get('/current', auth, current);
router.patch('/', auth, usersSubscSchema, subscription);
router.patch('/avatars', auth, avatars);

module.exports = router;
