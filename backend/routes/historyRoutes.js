const express = require('express');
const router = express.Router();
const { getHistory, saveHistory, deleteHistory, clearHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getHistory);
router.post('/', protect, saveHistory);
router.delete('/clear', protect, clearHistory);
router.delete('/:id', protect, deleteHistory);

module.exports = router;
