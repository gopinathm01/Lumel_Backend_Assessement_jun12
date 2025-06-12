const path = require('path');
const loadCSV = require('../utils/csvLoader');
const logger = require('../utils/logger');

async function refreshData() {
  const filePath = path.join(__dirname, '../data/sample.csv');
  logger.info('Running data refresh job...');
  try { 
    const result = await loadCSV(filePath);
    logger.info(`Data refresh successful: ${result}`);
  } catch (err) {
    logger.error(`Data refresh failed: ${err}`);
  }
} 

module.exports = refreshData;
