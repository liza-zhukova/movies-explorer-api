require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT, DB_CONNECT, DB_NAME } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkSource } = require('./middlewares/cors');
const { router } = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(DB_CONNECT + DB_NAME);

app.use(helmet());

app.use(checkSource);

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
