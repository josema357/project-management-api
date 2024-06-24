'use strict';

const { faker } = require('@faker-js/faker');
const { PROJECT_TABLE } = require('../models/projects');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const projectsData = [];

    for (let index = 0; index < 3; index++) {
      projectsData.push({
        name: faker.company.buzzVerb(),
        description: "description-testing-number",
        start_date: "2024-06-13",
        finish_date: "2024-07-13",
        status: "registered",
        customer_id: faker.number.int({ min: 1, max: 3 })
      });
    }

    await queryInterface.bulkInsert(PROJECT_TABLE, projectsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PROJECT_TABLE, null, {});
  }
};
