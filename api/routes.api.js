const express = require('express');
const usersRouter = require("./app/routes/users");
const customersRouter = require("./app/routes/customers");
const projectsRouter = require("./app/routes/projects");
const tasksRouter = require("./app/routes/tasks");
const commentsRouter = require("./app/routes/comments");

function routesApi(app){
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/users", usersRouter);
    router.use("/customers", customersRouter);
    router.use("/projects", projectsRouter);
    router.use("/tasks", tasksRouter);
    router.use("/comments", commentsRouter);
}

module.exports = routesApi;