'use strict';
const bcrypt = require('bcrypt');

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
    var users = [
      {
        first_name: "admin",
        last_name: "admin",
        email: "admin@email.com",
        phone: "9999999999",
        role: "admin",
        password: "123456789",
      }
    ]

    for (const row of users) {
      var user = await queryInterface.sequelize.query(`SELECT * FROM users WHERE email= :email`, {
        replacements: { email: row.email },
        type: Sequelize.QueryTypes.SELECT
      });

      if (user.length == 0) {
        var salt = await bcrypt.genSaltSync(10);
        var password_hash = await bcrypt.hashSync(row.password, salt);
        await queryInterface.bulkInsert('users', [{
          ...row, password: password_hash, createdAt: new Date(), updatedAt: new Date()
        }]);
      }
    }
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
