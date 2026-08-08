const express = require('express');
const router = express.Router();
const { getAllCalculators, getCalculatorBySlug, getCategories } = require('../controllers/calculatorController');

router.get('/', getAllCalculators);
router.get('/categories', getCategories);
router.get('/:slug', getCalculatorBySlug);

module.exports = router;
