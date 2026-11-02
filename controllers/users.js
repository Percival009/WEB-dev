const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, email, password } = req.body || {};
  if (![username, email, password].every(v => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ error: 'Enter a username, email and password.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, passwordHash });
  res.status(201).json({ username: user.username });
};

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  const user = typeof email === 'string' && await User.findOne({ email });
  if (!user || typeof password !== 'string' || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }
  req.session.userId = user.id;
  res.json({ message: 'Logged in' });
};

exports.logout = (req, res, next) => {
  req.session.destroy(error => error ? next(error) : res.clearCookie('connect.sid').sendStatus(204));
};
