'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    order_details: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts'
  });
  return Cart;
};