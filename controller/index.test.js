const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = require('../app');
const Users = require('../service/schemas/users');
const { DB_HOST, PORT } = process.env;

describe('test auth route', () => {
  /* Створюємо зміну server в яку записуєм посилання на слухач порту і який потім ми можем закрити */
  let server;
  /* Перед тестом в зміну записуемо слухач порту */
  beforeAll(() => (server = app.listen(PORT)));
  /* Після завершення тесту закрити слухач на порт */
  afterAll(() => server.close());

  /* Після app.listen підключаємось до БД */
  beforeEach(done => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  /* Створюмо наш тест */
  test('test signup', async () => {
    /* створюємо для прикладу дані користувача */
    const password = '123456a';
    const email = 'test123@gmail.com';
    /* хешируємо пароль */
    const hash = await bcrypt.hash(password, 10);

    /* Рееструємо вигаданого користувача */
    await Users.create({ email, password: hash });

    /* Робимо запит на логінізацію */
    const response = await request(app).post('/users/login').send({ email, password });

    const { token, user } = response.body;

    /* Перевіряємо статус який нам приходить */
    expect(response.statusCode).toBe(200);
    /* Робимо перевірку на наявність токіна / не пуста строка*/
    expect(token).not.toBe('');
    /* Перевіряємо наявність ключів у обєкта(avatarURL це я добавив хоча в дз такого не було) */
    expect(Object.keys(user)).toEqual(['email', 'subscription', 'avatarURL']);
    /* Перевіряємо тип даних */
    expect(typeof user.email == 'string').toEqual(true);
    expect(typeof user.subscription == 'string').toEqual(true);
  });
});
