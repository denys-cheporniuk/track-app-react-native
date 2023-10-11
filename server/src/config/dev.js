require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecretKey: process.env.SECRET_KEY,
};
