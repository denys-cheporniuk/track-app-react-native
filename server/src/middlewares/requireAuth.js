const keys = require('../config/keys');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'Not authorized' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, keys.jwtSecretKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    const { userId } = payload;

    req.user = await User.findById(userId);
    next();
  });
}


