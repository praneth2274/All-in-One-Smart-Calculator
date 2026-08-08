const History = require('../models/History');

let inMemoryHistory = [];

const getHistory = async (req, res) => {
  try {
    try {
      const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
      if (history && history.length > 0) {
        return res.json(history);
      }
    } catch (e) {}

    const userHist = inMemoryHistory.filter(h => String(h.userId) === String(req.user._id));
    res.json(userHist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveHistory = async (req, res) => {
  try {
    const { calculatorSlug, calculatorTitle, category, inputs, results, formattedSummary } = req.body;

    const itemData = {
      userId: req.user._id,
      calculatorSlug,
      calculatorTitle,
      category: category || 'General',
      inputs,
      results,
      formattedSummary,
      createdAt: new Date()
    };

    try {
      const saved = await History.create(itemData);
      return res.status(201).json(saved);
    } catch (e) {
      const mockSaved = { _id: 'hist_' + Date.now(), ...itemData };
      inMemoryHistory.unshift(mockSaved);
      return res.status(201).json(mockSaved);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await History.deleteOne({ _id: id, userId: req.user._id });
    } catch (e) {
      inMemoryHistory = inMemoryHistory.filter(h => h._id !== id);
    }
    res.json({ message: 'History record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearHistory = async (req, res) => {
  try {
    try {
      await History.deleteMany({ userId: req.user._id });
    } catch (e) {
      inMemoryHistory = inMemoryHistory.filter(h => String(h.userId) !== String(req.user._id));
    }
    res.json({ message: 'All calculation history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHistory, saveHistory, deleteHistory, clearHistory };
