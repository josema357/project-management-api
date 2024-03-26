const express = require("express");
const routesApi = require("./routes.api");
const sequelize = require("./libs/connection");
require("dotenv").config();

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

app.listen(port);
