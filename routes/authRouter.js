const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../utils/validateRoute');

authRouter.post(
  '/signin',
  signinValidation,
  login,
);

authRouter.post(
  '/signup',
  signupValidation,
  createUser,
);

module.exports = { authRouter };
