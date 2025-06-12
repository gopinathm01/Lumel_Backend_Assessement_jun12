const { QueryTypes } = require('sequelize');
const db = require('../models');
const sequelize = db.sequelize;
const logger = require('../utils/logger'); 

const getTopProducts = async (req, res) => {
  try {
    const { startDate, endDate, limit = 5, category, region } = req.query;

    if (!startDate || !endDate) {
      logger.warn('startDate or endDate missing in query');
      return res.status(400).json({ success: false, message: 'startDate and endDate are required' });
    }

    const replacements = {
      startDate,
      endDate,
      limit: parseInt(limit, 10)
    };

    let categoryFilter = '';
    let regionFilter = '';

    if (category) {
      categoryFilter = `AND p.category = :category`;
      replacements.category = category;
    }

    if (region) {
      regionFilter = `AND r.name = :region`;
      replacements.region = region;
    }

    const query = `
      SELECT 
        p.id AS productId,
        p.name,
        p.category,
        SUM(oi.quantity_sold) AS totalQuantity
      FROM order_items oi
      JOIN products p ON oi.ProductId = p.id
      JOIN orders o ON oi.OrderId = o.id
      JOIN regions r ON o.RegionId = r.id
      WHERE o.date_of_sale BETWEEN :startDate AND :endDate
      ${categoryFilter}
      ${regionFilter}
      GROUP BY p.id, p.name, p.category
      ORDER BY totalQuantity DESC
      LIMIT :limit;
    `;

    const results = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT
    });

    logger.info(`Top products retrieved from ${startDate} to ${endDate}`);
    return res.json({ success: true, data: results });

  } catch (error) {
    logger.error(`Error fetching top products: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTopProducts };
