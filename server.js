const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const { randomBytes } = require('node:crypto');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(session({ secret: randomBytes(32).toString('hex'), resave: false, saveUninitialized: false }));
app.get('/', (req, res) => res.send('Character API is running'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use((error, req, res, next) => {
  if (error.code === 11000) return res.status(409).json({ error: 'Username or email already exists' });
  if (['ValidationError', 'CastError'].includes(error.name) || error.status === 400) {
    return res.status(400).json({ error: 'Check the request data or character ID' });
  }
  res.status(500).json({ error: 'Server error' });
});

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI in .env first');
  await mongoose.connect(process.env.MONGODB_URI);
  await User.init();
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log('Character API running on http://localhost:' + port));
}
start().catch(error => {
  console.error('Startup failed:', error.name, 'Check .env and MongoDB connectivity.');
  process.exitCode = 1;
});
