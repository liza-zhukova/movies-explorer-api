const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('./validateUrl');

const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required().min(1900).integer(),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().min(2).custom(validateUrl),
    trailerLink: Joi.string().required().min(2).custom(validateUrl),
    thumbnail: Joi.string().required().min(2).custom(validateUrl),
    movieId: Joi.string().required().length(24).hex(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
  }),
});

module.exports = {
  postMovieValidation,
  deleteMovieValidation,
  patchUserValidation,
  signinValidation,
  signupValidation,
};
