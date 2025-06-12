const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    address: DataTypes.TEXT
  }, {
    tableName: 'Customer',
    timestamps: false
  });

  return Customer;
}; 
