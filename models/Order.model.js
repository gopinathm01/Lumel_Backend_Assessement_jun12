module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: DataTypes.STRING,
    date_of_sale: DataTypes.DATE,
    payment_method: DataTypes.STRING,
    CustomerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'id'
      }
    },
    RegionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'regions',
        key: 'id'
      }
    }
  }, {
    tableName: 'orders',
    timestamps: false,
  });
 
  return Order;
};
