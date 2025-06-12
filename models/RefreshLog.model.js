// models/refreshLog.model.js
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const RefreshLog = sequelize.define('RefreshLogs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    status: DataTypes.STRING,
    message: DataTypes.TEXT,
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'RefreshLogs',
    timestamps: false
  });

  return RefreshLog;
};
 