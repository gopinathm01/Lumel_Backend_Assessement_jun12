const express = require('express');
const router = express.Router();

const { getTopProducts } = require('../controllers/topProducts.controller');

// GET /api/top-products
router.get('/top-products', getTopProducts);

module.exports = router;