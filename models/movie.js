const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateUrl');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: { validator: validateUrl, message: 'Некорректный формат ссылки' },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: validateUrl, message: 'Некорректный формат ссылки' },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: validateUrl, message: 'Некорректный формат ссылки' },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', userSchema);