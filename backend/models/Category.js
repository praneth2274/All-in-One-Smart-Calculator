const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  calculatorCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Category', categorySchema);
