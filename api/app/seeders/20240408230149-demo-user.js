'use strict';

const { faker } = require('@faker-js/faker')
const { USER_TABLE } = require('../models/users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const usersData = [];

    for (let index = 0; index < 3; index++) {
      usersData.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        rol: "employee"
      });
    }

    await queryInterface.bulkInsert(USER_TABLE, usersData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
