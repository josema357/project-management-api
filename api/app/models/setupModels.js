const { User, UserSchema } = require('./users');
const { Customer, CustomerSchema } = require('./customers');
const { Project, ProjectSchema } = require('./projects');
const { Task, TaskSchema } = require('./tasks');
const { Assignment, AssignmentSchema } = require('./assignments');
const { CommentSchema } = require('./comments');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Project.init(ProjectSchema, Project.config(sequelize));
    Task.init(TaskSchema, Task.config(sequelize));
    Assignment.init(AssignmentSchema, Assignment.config(sequelize));
    Comment.init(CommentSchema, Comment.config(sequelize));

    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Project.associate(sequelize.models);
    Task.associate(sequelize.models);
    Comment.associate(sequelize.models);
}

module.exports= setupModels;