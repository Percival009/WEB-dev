const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', schema);
