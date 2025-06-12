const express = require('express');
const router = express.Router();

const { refreshData } = require('../controllers/refresh.controller');

router.post('/refresh', refreshData);

module.exports = router;
