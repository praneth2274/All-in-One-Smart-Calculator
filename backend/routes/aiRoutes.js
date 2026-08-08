const express = require('express');
const router = express.Router();
const { explainCalculation, aiChat } = require('../controllers/aiController');

router.post('/explain', explainCalculation);
router.post('/chat', aiChat);

module.exports = router;
