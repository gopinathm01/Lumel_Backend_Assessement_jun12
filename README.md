ERP DIAGRAM FOR DATABASE - https://dbdocs.io/mgopinath413/Backend_Assement_DB_ERP_Diagram?view=relationships

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

    Run npm install - install dependencies

    Setup your .env file (DB credentials, PORT, etc.)

    Start the server: npm start

    Use the provided data/sample.csv for manual data refresh via API 

3) API Endpoints

    POST /api/refresh

        Trigger manual data refresh from CSV file 

       -  CronJob run for this Every 5 minutes Once

    GET /api/top-products

        Retrieve top N products by quantity sold within a date range

        Supports filters:

            limit (number of top products, default 5)

            category (filter by product category)

            region (filter by sales region)

        Query parameters:

            startDate (required)

            endDate (required)

4) Core Analysis Implemented

    Top N Products:

        Overall: Based on quantity sold within a date range

        By Category: Based on quantity sold filtered by category within a date range

        By Region: Based on quantity sold filtered by region within a date range

5) Testing with Postman

    Import the included Postman collection from /postman/lumel_backend_assessement.postman_collection.json

    Test API endpoints easily

    Validate error responses by calling endpoints with missing or invalid parameters

    Confirm logs generated in /logs folder after refresh calls 

project structure -- > refer projectStructure.txt  