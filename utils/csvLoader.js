const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const db = require('../models');
const logger = require('./logger'); // 🆕 Logging added
const { Customer, Region, Product, Order, OrderItem, RefreshLog } = db;

async function loadCSV(filePath) {
  const rows = [];

  logger.info('📂 Reading CSV file...');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', async () => {
        logger.info(`📦 CSV file processed. Total rows: ${rows.length}`);
        const transaction = await db.sequelize.transaction();

        try {
          for (const row of rows) {
            // 1. Region
            const [region] = await Region.findOrCreate({
              where: { name: row['Region'] },
              defaults: { id: uuidv4() },
              transaction
            });

            // 2. Customer
            const [customer] = await Customer.findOrCreate({
              where: { email: row['Customer Email'] },
              defaults: {
                id: uuidv4(),
                name: row['Customer Name'],
                address: row['Customer Address'],
                RegionId: region.id
              },
              transaction
            });

            // 3. Product
            const [product] = await Product.findOrCreate({
              where: { product_id: row['Product ID'] },
              defaults: {
                id: uuidv4(),
                name: row['Product Name'],
                category: row['Category']
              },
              transaction
            });

            // 4. Order
            let order = await Order.findOne({
              where: { order_id: row['Order ID'] },
              transaction
            });

            if (!order) {
              order = await Order.create({
                id: uuidv4(),
                order_id: row['Order ID'],
                date_of_sale: new Date(row['Date of Sale']),
                payment_method: row['Payment Method'],
                CustomerId: customer.id,
                RegionId: region.id
              }, { transaction });
            }

            // 5. OrderItem
            await OrderItem.create({
              id: uuidv4(),
              OrderId: order.id,
              ProductId: product.id,
              quantity_sold: parseInt(row['Quantity Sold']),
              unit_price: parseFloat(row['Unit Price']),
              discount: parseFloat(row['Discount']),
              shipping_cost: parseFloat(row['Shipping Cost'])
            }, { transaction });
          }

          // 6. Log success
          await RefreshLog.create({
            id: uuidv4(),
            status: 'success',
            message: `Imported ${rows.length} rows successfully`
          }, { transaction });

          await transaction.commit();
          logger.info(`✅ Loaded ${rows.length} rows successfully`);
          resolve(`✅ Loaded ${rows.length} rows successfully`);
        } catch (error) {
          await transaction.rollback();
          logger.error(`❌ Transaction failed: ${error.message}`);

          try {
            await RefreshLog.create({
              id: uuidv4(),
              status: 'failed',
              message: error.message
            });
          } catch (logErr) {
            logger.error(`⚠️ Failed to log refresh error: ${logErr.message}`);
          }

          reject(`❌ CSV Load failed: ${error.message}`);
        }
      })
      .on('error', (err) => {
        logger.error(`❌ Error reading CSV: ${err.message}`);
        reject(`❌ Error reading CSV: ${err.message}`);
      });
  });
}

module.exports = loadCSV;
