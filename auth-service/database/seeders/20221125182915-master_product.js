'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    var products = [
      {
        product_name: "หม้อหุงข้าว",
        product_price: 2300,
        product_desc: "",
        product_count: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_name: "กล้องถ่ายรูป",
        product_price: 12000,
        product_desc: "",
        product_count: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_name: "ยาสระผม",
        product_price: 12000,
        product_desc: "",
        product_count: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    var products_aggregate = [];
    for (const product of products) {
      let find_product = await queryInterface.sequelize.query(`SELECT * FROM products WHERE product_name= :product_name`, {
        replacements: { product_name: product.product_name },
        type: Sequelize.QueryTypes.SELECT
      });

      if (find_product.length == 0) {
        products_aggregate.push(product);
      }
    }

    if (products_aggregate.length > 0) await queryInterface.bulkInsert('products', products_aggregate);




  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
