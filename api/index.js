const express = require("express");
const routesApi = require("./routes.api");
const sequelize = require("./libs/connection");
require("dotenv").config();
const {logErrors} = require("./middlewares/logErrorHandler");
const {ormErrorHandler} = require("./middlewares/sequelizeErrorHandler");
const {boomErrorHandler} = require("./middlewares/boomErrorHandler");
const {errorHanlder} = require("./middlewares/othersErrorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("My server in express");
  //Testing the connection
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

routesApi(app);

//Middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHanlder);

app.listen(port);
