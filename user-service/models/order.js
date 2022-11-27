'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Cart, {
        foreignKey: 'order_id',
        sourceKey: 'id',
        onDelete: 'CASCADE'
      });

    }
  }
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    sub_district: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    contact: DataTypes.STRING,
    order_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders'
  });
  return Order;
};