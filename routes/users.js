const userRouter = require('express').Router();
const { getProfile, createUser, updateUser } = require('../controllers/users');
const { patchUserValidation } = require('../utils/validateRoute');

userRouter.get('/users/me', getProfile);
userRouter.post('/users', createUser);
userRouter.patch(
  '/users/me',
  patchUserValidation,
  updateUser,
);

module.exports = { userRouter };
