require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParses = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParses.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://denyscheporniuk:GVRFqs7o8bx38eyz@track-db.kkbopwk.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
})
mongoose.connection.on('error', (e) => {
  console.log('error connection', e);
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email - ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Server started');
})
