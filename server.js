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
// ./ in front of the name references a file within the same folder
models.init();
// Runs init function inside of models.js and syncs database -> this creates our tables with Sequelize
const moment = require("moment");



/* app.get("/", (req, res) => {
    //res.send({ hello: "world" });
});*/
// Creates endpoint for server and allows us to check and make sure it's connected
// "Hello world" is a common convention among programmers and a personal favorite
// Returns JSON object specified in the send request

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // References index.html file (needs __dirname to work for absolute path!) and uses sendFile instead of just send to export the content
    // serves your front end through the node server instead of just opening index.html in the browser
});

app.post("/task", async (req, res) => {
    // function will run asynchronously -> starts the create and waits until new task is completely done -> pauses code until create on Sequelize end is finished then moves to next code block -> tells front end to wait for Sequelize
    await models.Tasks.create({
        // references models and table name, creates new entry in tasks table
        name: req.body.name,
        // using body-parser, we can get access to the JSON in the body and display it on the front-end
        creationTime: new Date(),
        // user doesn't enter in the time task was created -> defaults to server time
        dueTime: req.body.dueTime,
        userName: req.body.userName
    });

    res.send({ tasks: await models.Tasks.findAll() });
    // nothing isn't valid JSON but an empty object is!
    // status: "adequate"
    // change res.send to tasks to send the tasks from the database back instead of the test status
    // creates new task and returns it with the previously created ones
});
// creates API endpoint to fetch to on index.html

app.get("/task", async (req, res) => {
    const tasks = await models.Tasks.findAll();
    // creates variable to store the results of the tasks table and sends them to the front end using Sequelize to handle the SQL queries
    res.send({ tasks });
})

app.listen(8080, "0.0.0.0", () => {
    console.log("Server is running!");
});
// Tells server which port to "listen" on (8080) with any IP address ("0.0.0.0") and prints a message to the console that the server is running if successful

