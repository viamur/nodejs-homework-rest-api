const jwt = require('jsonwebtoken');
const { findByIdUser } = require('../service/');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  /* Беремо з headers данні */
  const { authorization = '' } = req.headers;
  /* Розбиваємо строку на строки массива */
  const [bearer, token] = authorization.split(' ');

  /* Перевіряємо тип токену та чи є токін*/
  if (bearer !== 'Bearer' || token === '') {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  try {
    /* Витягуємо id з payload нашого токену */
    const { id } = jwt.verify(token, SECRET_KEY);
    /* Шукаємо користувача з id в БД */
    const user = await findByIdUser({ id });
    /* Перевіряємо якщо користувач не знайден, або якщо він вже розлогінен */
    if (!user || !user.token) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
    /* Записуєм в реквест данні юзера */
    req.user = { id: user._id, subscription: user.subscription, email: user.email };
    /* Переходимо далі */
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = auth;
