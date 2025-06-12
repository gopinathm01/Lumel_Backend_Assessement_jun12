const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4
    },
    quantity_sold: DataTypes.INTEGER,
    unit_price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    shipping_cost: DataTypes.FLOAT
  }, {
    tableName: 'order_items',
    timestamps: false
  });

  return OrderItem;
};
