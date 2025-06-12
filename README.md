Project Structure  

sales-insights-api/
├── config/
│   └── db.config.js             # Database configuration
├── controllers/
│   ├── refresh.controller.js   # Refresh data API logic
│   └── topProducts.controller.js # Top products API logic
├── models/                     # Sequelize models (Customer, Product, Order, etc.)
├── routes/
│   ├── refresh.routes.js       # Refresh API routes
│   └── topProducts.routes.js   # Top products API routes
├── utils/
│   └── csvLoader.js            # CSV data loader script
├── data/
│   └── sample.csv              # Sample CSV data file
├── jobs/
│   └── dataRefresh.js          # Background job for daily refresh (optional)
├── logs/                       # Logs folder (make sure this exists)
├── server.js                   # Main server entry point
├── .env                       # Environment variables
└── README.md                   # Project documentation
 

1)  Installed Dependencies

    Node.js (v20+ recommended)

    Express - Web framework for Node.js

    Sequelize - ORM for MySQL database

    mysql2 - MySQL driver for Node.js

    dotenv - Loads environment variables from .env

    csv-parser or equivalent CSV parsing library (used in csvLoader.js)

    winston or similar logging library 

    node-cron  


2) How to Run

    Clone the repo

    Run npm install to install dependencies

    Setup your .env file (DB credentials, PORT, etc.)

    Start the server: npm start

    Use the provided data/sample.csv for manual data refresh via API 

3) API Endpoints

    POST /api/refresh — Trigger manual data refresh from CSV

    GET /api/top-products — Get top N products by quantity sold in a date range 

4) Testing with Postman

    Import the included Postman collection from /postman/lumel_backend_assessement.postman_collection.json

    Test API endpoints easily

    Validate error responses by calling endpoints with missing or invalid parameters

    Confirm logs generated in /logs folder after refresh calls