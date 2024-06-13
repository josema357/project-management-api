const express = require('express');
const usersRouter = require("./app/routes/users");
const customersRouter = require("./app/routes/customers");
const projectsRouter = require("./app/routes/projects");

function routesApi(app){
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/users", usersRouter);
    router.use("/customers", customersRouter);
    router.use("/projects", projectsRouter);
}

module.exports = routesApi;