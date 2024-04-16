'use strict';

const { UserSchema, USER_TABLE } = require('../models/users');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customers');
const { ProjectSchema, PROJECT_TABLE  } = require('../models/projects');
const { TASK_TABLE, TaskSchema } = require('../models/tasks');
const { ASSIGNMENT_TABLE, AssignmentSchema } = require('../models/assignments');
const { COMMENT_TABLE, CommentSchema } = require('../models/comments');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(PROJECT_TABLE, ProjectSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
    await queryInterface.createTable(ASSIGNMENT_TABLE, AssignmentSchema);
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
  },
  async down (queryInterface) {
    await queryInterface.dropTable(COMMENT_TABLE);
    await queryInterface.dropTable(ASSIGNMENT_TABLE);
    await queryInterface.dropTable(TASK_TABLE);
    await queryInterface.dropTable(PROJECT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    
    
    
  }
};
