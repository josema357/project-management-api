'use strict';

const { UserSchema, USER_TABLE } = require('../models/users');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customers');
const { ProjectSchema, PROJECT_TABLE  } = require('../models/projects');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(PROJECT_TABLE, ProjectSchema);
  },
  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PROJECT_TABLE);
  }
};
