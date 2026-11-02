const router = require('express').Router();
const posts = require('../controllers/posts');

router.get('/', posts.list);
router.use((req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Log in first' });
  next();
});
router.post('/', posts.create);
router.patch('/:id', posts.update);
router.delete('/:id', posts.remove);
module.exports = router;
