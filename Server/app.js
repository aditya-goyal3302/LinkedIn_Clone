//config
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { multer: { upload } } = require("./middlewares");
const { MulterError } = require("multer");
const server = http.createServer(app);
app.use(cors());

//Socket connection
const {socket} =require("./config").
socket(server);

// parse application/json
app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit:"5mb", extended: true }));

//middleware
app.use(upload.fields([{ name: "link", maxCount: 4 },{ name: "image", maxCount: 1 },]));
app.use(express.static("public"));
app.use("/uploads/images/:FileName", (req,res)=>res.redirect(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.params.FileName}`));

// Connect to DB
require("./config/mongo_db").connectDB();

//routes
app.use("/", require("./routes"));
//server
app.use((err, req, res, next) => {
  console.log('err: ', err);
  if(err instanceof MulterError)
    res.status(400).send("File size Error")
  res.status(404).send({ e: "Page not found" });
});

server.listen(process.env.PORT, () =>
  console.log(`Server Up and running on port ${process.env.PORT}`)
);
