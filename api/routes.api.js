const express = require('express');
const usersRouter = require("./app/routes/users");

function routesApi(app){
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/users",usersRouter);
}

module.exports = routesApi;