require("dotenv").config()
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)




server.listen(process.env.PORT, ()=>
    console.log(`Notification Server is up and running on port ${process.env.PORT}`)
)