const router = require('express').Router();
const users = require('../controllers/users');

router.post('/register', users.register);
router.post('/login', users.login);
router.post('/logout', users.logout);
module.exports = router;
