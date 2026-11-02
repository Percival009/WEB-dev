const Post = require('../models/Post');

exports.create = async (req, res) => {
  const { name, description, age } = req.body || {};
  res.status(201).json(await Post.create({ name, description, age }));
};

exports.list = async (req, res) => {
  res.json(await Post.find().sort({ createdAt: -1 }));
};

exports.update = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Character not found' });
  for (const key of ['name', 'description', 'age']) {
    if (Object.hasOwn(req.body || {}, key)) post[key] = req.body[key];
  }
  res.json(await post.save());
};

exports.remove = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: 'Character not found' });
  res.sendStatus(204);
};
