require("dotenv").config()
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app)
const {socket} =require("./config").
socket(server);
// parse application/json
app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Connect to DB
require("./config/mongo_db").connectDB();


app.use('/',require('./routes'))

app.use((req, res) => {
    // console.log('err: ', req);
    // if (error instanceof MulterError)
      // return res.status(400).send("File size Error")
    res.status(404).send({ e: "Page not found" });
  });

server.listen(process.env.PORT, ()=>
    console.log(`Notification Server is up and running on port ${process.env.PORT}`)
)