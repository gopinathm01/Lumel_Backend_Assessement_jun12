const path = require('path');
const loadCSV = require('../utils/csvLoader');
const logger = require('../utils/logger'); 

const refreshData = async (req, res) => {
  const filePath = path.join(__dirname, '../data/sample.csv');

  try {
    logger.info('Manual refresh started');
    
    const result = await loadCSV(filePath);
    
    logger.info(`Manual refresh successful: ${result}`);
    res.status(200).json({ success: true, message: result });

  } catch (error) {
    logger.error(`Manual refresh failed: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { refreshData };
