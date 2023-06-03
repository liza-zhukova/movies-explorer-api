const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

module.exports.getFilms = (req, res, next) => {
  Movie.find({})
    .populate(['owner', 'likes'])
    .then((films) => {
      res.send(films);
    })
    .catch(next);
};

module.exports.createFilm = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((filmItem) => res.send(filmItem))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteFilm = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Такого фильма не сущеcтвует'))
    .then((film) => {
      if (film.owner._id.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Недостаточно прав'));
      }
      return film.deleteOne();
    })
    .then((film) => res.send(film))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
