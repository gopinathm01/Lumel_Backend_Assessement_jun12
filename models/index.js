const { Sequelize } = require('sequelize');
require('dotenv').config();
const config = require('../config/db.config');

// Initialize Sequelize
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT,
    logging: false,
  }
);

// Initialize database object
const db = {};

// Attach Sequelize instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Customer = require('./Customer.model')(sequelize, Sequelize);
db.Region = require('./Region.model')(sequelize, Sequelize);
db.Product = require('./Product.model')(sequelize, Sequelize);
db.Order = require('./Order.model')(sequelize, Sequelize);
db.OrderItem = require('./OrderItem.model')(sequelize, Sequelize);
db.RefreshLog = require('./RefreshLog.model')(sequelize, Sequelize);

// Define relationships
// Customer - Order (One-to-Many)
db.Customer.hasMany(db.Order, { foreignKey: { name: 'CustomerId', allowNull: false } });
db.Order.belongsTo(db.Customer, { foreignKey: { name: 'CustomerId', allowNull: false } });

// Region - Order (One-to-Many)
db.Region.hasMany(db.Order, { foreignKey: { name: 'RegionId', allowNull: false } });
db.Order.belongsTo(db.Region, { foreignKey: { name: 'RegionId', allowNull: false } });

// Product - OrderItem (One-to-Many)
db.Product.hasMany(db.OrderItem, { foreignKey: { name: 'ProductId', allowNull: false } });
db.OrderItem.belongsTo(db.Product, { foreignKey: { name: 'ProductId', allowNull: false } });

// Order - OrderItem (One-to-Many)
db.Order.hasMany(db.OrderItem, { foreignKey: { name: 'OrderId', allowNull: false } });
db.OrderItem.belongsTo(db.Order, { foreignKey: { name: 'OrderId', allowNull: false } });

module.exports = db;
