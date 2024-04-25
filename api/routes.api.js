const express = require('express');
const usersRouter = require("./app/routes/users");
const customersRouter = require("./app/routes/customers");

function routesApi(app){
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/users", usersRouter);
    router.use("/customers", customersRouter);
}

module.exports = routesApi;