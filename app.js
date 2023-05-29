const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/filmsdb');

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
