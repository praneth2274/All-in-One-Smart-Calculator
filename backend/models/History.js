const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calculatorSlug: { type: String, required: true },
  calculatorTitle: { type: String, required: true },
  category: { type: String, required: true },
  inputs: { type: Object, required: true },
  results: { type: Object, required: true },
  formattedSummary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
