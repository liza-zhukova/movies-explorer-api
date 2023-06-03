const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');
const { validateUrl } = require('../utils/validateUrl');

router.get('/movies', getFilms);
router.post(
  '/movies',
  celebrate({
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
  }),
  createFilm,
);
router.delete(
  '/movies/_id',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteFilm,
);
