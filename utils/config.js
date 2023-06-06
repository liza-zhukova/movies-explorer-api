const {
  PORT = 3000,
  DB_NAME = 'filmsbd',
  DB_CONNECT = 'mongodb://localhost:27017/',
} = process.env;

module.exports = {
  PORT,
  DB_CONNECT,
  DB_NAME,
};
