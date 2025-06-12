// scripts/syncModels.js
const db = require('../models');

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("All models synced!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Failed to sync models:", err);
    process.exit(1);
  });
 