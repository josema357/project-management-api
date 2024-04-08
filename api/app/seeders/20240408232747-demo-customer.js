'use strict';

const { faker } = require('@faker-js/faker');
const { CUSTOMER_TABLE } = require('../models/customers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const customersData = [];

    for (let index = 0; index < 3; index++) {
      customersData.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.string.numeric({length: 9}),
      });
    }

    await queryInterface.bulkInsert(CUSTOMER_TABLE, customersData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
  }
};
