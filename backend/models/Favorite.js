const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calculatorSlug: { type: String, required: true },
  calculatorTitle: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

favoriteSchema.index({ userId: 1, calculatorSlug: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
