const { User, UserSchema } = require('./users');
const { Customer, CustomerSchema } = require('./customers');
const { Project, ProjectSchema } = require('./projects');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Project.init(ProjectSchema, Project.config(sequelize));

    Customer.associate(sequelize.models);
    Project.associate(sequelize.models);
}

module.exports= setupModels;