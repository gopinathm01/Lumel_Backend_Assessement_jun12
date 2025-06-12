const path = require('path');
const loadCSV = require('../utils/csvLoader');
const db = require('../models');

(async () => {
  console.log("✅ Connecting to database...");
  await db.sequelize.authenticate();
  console.log("🔧 Syncing database schema...");
  await db.sequelize.sync();

  const filePath = path.join(__dirname, '../data/sample.csv');
  console.log("🚀 Reading CSV file...");

  try {
    const result = await loadCSV(filePath);
    console.log("📦 CSV file processed.", result);
  } catch (err) {
    console.error("❌ Error loading CSV:", err);
  } finally {
    await db.sequelize.close();
    console.log("🔌 Database connection closed.");
  }
})();
