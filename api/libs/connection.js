const { Sequelize } = require('sequelize');
const setupModels = require('../app/models/setupModels');
require('dotenv').config();

const URI = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(URI);
setupModels(sequelize);

module.exports= sequelize;