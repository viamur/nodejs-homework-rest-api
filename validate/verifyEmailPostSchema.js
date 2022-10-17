const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const usersVerifySchema = (req, res, next) => {
  /* перевіряємо, щоб не була пуста строка */
  if (!req.body.email) {
    return res.status(400).json({ message: 'missing required field email' });
  }
  /* Робимо валідацію за допомогою joi */
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = usersVerifySchema;
