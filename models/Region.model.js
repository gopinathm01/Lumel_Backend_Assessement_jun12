const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'regions',
    timestamps: false
  });

  return Region;
};
