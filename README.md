ERP DIAGRAM FOR DATABASE - https://dbdocs.io/mgopinath413/Backend_Assement_DB_ERP_Diagram?view=relationships  

ERP DIAGRAM PICTURE - refer AssessementDocumentation/ERPDiagram.png



Depenecies used -  Installed Dependencies

                                            Node.js (v20+ recommended)

                                            Express - Web framework for Node.js

                                            Sequelize - ORM for MySQL database

                                            mysql2 - MySQL driver for Node.js

                                            dotenv - Loads environment variables from .env

                                            csv-parser or equivalent CSV parsing library (used in csvLoader.js)

                                            winston or similar logging library 

                                            node-cron  




Top N Product API – Backend Assessment 

Step 1 :
            Tech Stack used in Task 
                - NodeJS   - version 22+
                - ExpressJS 
                - Mysql - v8.x
                - ORM - Sequelize




step 2:

            Folder Structure  
                Top-N-Product-API/

                        config/db.config.js                                        # Database configuration
                        controllers/
                                /refresh.controller.js                             # Refresh data API logic
                                /topProducts.controller.js                         # Top products API logic
                        models/                                                    # Sequelize models (Customer, Product, Order, etc.)
                        routes/
                            /refresh.routes.js                                     # Refresh API routes
                            /topProducts.routes.js                                 # Top products API routes
                        utils/
                            /csvLoader.js                                          # CSV data loader script
                        data/
                            /sample.csv                                            # Sample CSV data file
                        jobs/
                            /dataRefresh.js                                        # Background job for daily refresh (optional)
                        logs/                                                      # Logs folder (make sure this exists)
                        server.js                                                  # Main server entry point
                        .env                                                       # Environment variables
                        README.md                                                  # Project documentation 

Step 3: 
            DB_Schema  

                - Customer   (one to Many)
                - Product    (one to Many)
                - Region     (one to Many)
                - Order      (one to Many)
                - OrderItem  (one to Many)
                - RefreshLog (one to Many)

                Reference -  assessementDocumentation/ERDiagram.png 
                ERPDiagram Link -  https://dbdocs.io/mgopinath413/Backend_Assement_DB_ERP_Diagram?view=relationships  


Step 4: 
            SetUp Instruction 

                
                    - Clone the repo

                    - Run -  npm install    # to install dependencies

                    - Setup your .env file   (DB credentials, PORT, etc.) 
                                DB_HOST=localhost
                                DB_USER=root
                                DB_PASSWORD=yourpassword
                                DB_NAME=sales_db
                                PORT=3000 

                    - run - npm run load-csv   #manual csv file upload data

                    - npm start             #Start the server

                        Use the provided data/sample.csv for manual data refresh via API   

                    
                        
                    - CRON run every 24 hours for understanding we can keep for [24 hours] (1 day) for refresh mechanism   

Step 5:

            Core Analysis Implemented

                Top N Products:

                    Overall: Based on quantity sold within a date range

                    By Category: Based on quantity sold filtered by category within a date range

                    By Region: Based on quantity sold filtered by region within a date range 


Step 6: 
            API Endpoints

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



Step 7: 
            API Response 
                
                POST - http://localhost:3000/api/refresh      #API End point

                Response - 
                        {
                        "success": true,
                        "message": "Loaded 6 rows successfully"
                    }

                GET - http://localhost:3000/api/top-products?startDate=2023-12-15&endDate=2024-05-18    #API End point

                Response - 
                                {
                        "success": true,
                        "data": [
                            {
                                "productId": "05a39cf3-3ebc-4051-bcf1-06ba23c5887f",
                                "name": "iPhone 15 Pro",
                                "category": "Electronics",
                                "totalQuantity": "21"
                            },
                            {
                                "productId": "c948f2e5-1cfd-49ff-b615-60b2c85863a5",
                                "name": "UltraBoost Running Shoes",
                                "category": "Shoes",
                                "totalQuantity": "21"
                            },
                            {
                                "productId": "e8626fcb-2e5d-4555-904a-f0f6e02b1738",
                                "name": "Levi's 501 Jeans",
                                "category": "Clothing",
                                "totalQuantity": "21"
                            },
                            {
                                "productId": "4e33436e-333a-4e67-9b0e-56aaec69123c",
                                "name": "Sony WH-1000XM5 Headphones",
                                "category": "Electronics",
                                "totalQuantity": "7"
                            }
                        ]
                    }

Step 8:
            Automated Job

                A daily cron job (via node-cron) refreshes the dataset.

                Current Cron: 0 0 * * → Every 24 hours once
                Can be configured in: jobs/dataRefresh.js

Step 9: 
            /postman/lumel_backend_assessement.postman_collection.json


Step 10:
            Logging

                    All refresh events are logged to /logs/refresh.log.
                    This includes timestamps, statuses, and error messages. 

Step 11:
            Testing

                    Manual Testing: via Postman

                    Error Handling: Tested with missing/invalid query parameters

                    Validation: CSV validation handled in utils/csvLoader.js