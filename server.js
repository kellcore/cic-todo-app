const express = require('express');
const app = express();
// Require Express and create app
// Why an app? You could have Express apps running on multiple ports within the same project so each of those would need to be stored in its own variable
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Require body-parser -> allows you to access req.body object when JSON is sent in a request
//const Sequelize = require('sequelize');
// Require Sequelize -> an ORM that allows you to construct and edit your data models in JS without having to write raw SQL
const models = require("./models")();
// References models.js and allows us to use code from that page here -> module.exports is a function that we call using the () -> will return/output db object
models.init();
// Runs init function inside of models.js and syncs database -> this creates our tables with Sequelize


app.get("/", (req, res) => {
    res.send({ hello: "world" });
});
// Creates endpoint for server and allows us to check and make sure it's connected
// "Hello world" is a common convention among programmers and a personal favorite
app.listen(8080, "0.0.0.0", () => {
    console.log("Server is running!");
});
// Tells server which port to "listen" on and prints a message that the server is running if successful

