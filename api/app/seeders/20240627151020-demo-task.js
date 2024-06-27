'use strict';

const { faker } = require("@faker-js/faker");
const { TASK_TABLE } = require("../models/tasks");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const task_data = [];

    for (let index = 0; index < 3; index++) {
      task_data.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        status: "started",
        project_id: faker.number.int({ min: 1, max: 3 })
      });
    }

    await queryInterface.bulkInsert(TASK_TABLE, task_data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TASK_TABLE, null, {});
  }
};
