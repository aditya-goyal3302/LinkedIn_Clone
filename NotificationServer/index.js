require("dotenv").config()
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const {socket} =require("./config").
socket(server);
// parse application/json
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Connect to DB
require("./config/mongo_db").connectDB();

app.use(require('cors')())

app.use('/',require('./routes'))


server.listen(process.env.PORT, ()=>
    console.log(`Notification Server is up and running on port ${process.env.PORT}`)
)