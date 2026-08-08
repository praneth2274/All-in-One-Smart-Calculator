const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Calculator' },
  keywords: [{ type: String }],
  isPopular: { type: Boolean, default: false },
  usageCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Calculator', calculatorSchema);
