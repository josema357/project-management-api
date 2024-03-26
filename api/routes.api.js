const express = require('express')

function routesApi(app){
    const router = express.Router();
    app.use('api/v1', router);
}

module.exports = routesApi;