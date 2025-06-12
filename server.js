require('dotenv').config();
const express = require('express');
const db = require('./models'); 

const cron = require('node-cron');
const refreshData = require('./jobs/dataRefresh');

const app = express(); 
app.use(express.json()); 


const refreshRoutes = require('./routes/refresh.routes');
app.use('/api', refreshRoutes);  


const topProductsRoutes = require('./routes/topProducts.routes');
app.use('/api', topProductsRoutes);


db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced!");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("Sync failed:", err);
  }); 



// Schedule job to run every 24 hours once
cron.schedule('0 0 * *', async () => {
  console.log('Daily refresh job started...');
  await refreshData();
});


