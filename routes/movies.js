const movieRouter = require('express').Router();
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');
const { postMovieValidation, deleteMovieValidation } = require('../utils/validateRoute');

movieRouter.get('/movies', getFilms);
movieRouter.post(
  '/movies',
  postMovieValidation,
  createFilm,
);
movieRouter.delete(
  '/movies/_id',
  deleteMovieValidation,
  deleteFilm,
);

module.exports = { movieRouter };
