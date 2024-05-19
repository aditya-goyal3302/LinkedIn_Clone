//config
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
var proxy = require('express-http-proxy');
const { multer: { upload } } = require("./middlewares");
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { MulterError } = require("multer");
const server = http.createServer(app);
app.use(cors());
const S3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }
})

//Socket connection
const { socket } = require("./config").socket(server);

// parse application/json
app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

//middleware
app.use(upload.fields([{ name: "link", maxCount: 4 }, { name: "image", maxCount: 1 },]));
app.use(express.static("public"));
app.use("/uploads/images/:FileName",
  proxy(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
    {
      proxyReqPathResolver: (req) => `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.params.FileName.replace(" ", "+")}`
    }
  )
);

// Connect to DB
require("./config/mongo_db").connectDB();

//routes
app.use("/", require("./routes"));
//server
app.use((err, req, res, next) => {
  console.log('err: ', err);
  if (err instanceof MulterError)
    res.status(400).send("File size Error")
  res.status(404).send({ e: "Page not found" });
});

server.listen(process.env.PORT, () =>
  console.log(`Server Up and running on port ${process.env.PORT}`)
);
