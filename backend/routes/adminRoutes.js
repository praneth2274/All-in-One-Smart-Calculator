const express = require('express');
const router = express.Router();
const { getAdminStats, getAdminUsers, submitFeedback, submitReport } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/stats', protect, admin, getAdminStats);
router.get('/users', protect, admin, getAdminUsers);
router.post('/feedback', submitFeedback);
router.post('/report', submitReport);

module.exports = router;
