const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getProfile, createUser, updateUser } = require('../controllers/users');

router.get('/users/me', getProfile);
router.post('/users', createUser);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser,
);

module.exports = router;
