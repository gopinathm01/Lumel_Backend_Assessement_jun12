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


API module implemented - TopProducts


  1)  Manual API Testing with Postman:

    A Postman collection is included in the /postman folder.

    Import it into Postman to test all API endpoints easily.

   2) Collection includes:

      -  POST /api/refresh - Trigger data refresh manually 

      - GET /api/top-products - Fetch top N products within a date range

   3) stepUp:  
     npm install 
-    npm start  

   4)  Test Data Setup:

    Use the provided data/sample.csv file for testing data refresh.

    The CSV loader validates and loads data into the database during refresh.  

    5)  Error Handling Tests:

    Test API with invalid/missing parameters to ensure meaningful error responses.

    Example: call /api/top-products without startDate or endDate. 

    6) Logging:

    All refresh activities (success/failure) are logged in /logs/.

    Check log files to troubleshoot or verify refresh status.
 
 7) postman collection  

    Lumel_Backend_Assessement/lumel_backend_assessement.postman_collection.json