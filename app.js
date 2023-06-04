require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT, DB_CONNECT, DB_NAME } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkSource } = require('./middlewares/cors');
const { router } = require('./routes/index');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(DB_CONNECT + DB_NAME);

app.use(checkSource);

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500
    ? 'На сервере произошла ошибка'
    : err.message;

  res.status(statusCode).send({ message });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
