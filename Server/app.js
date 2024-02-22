const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");

//config
dotenv.config();

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).fields([
  { name: "link", maxCount: 4 },
]);
app.use(upload);
app.use(express.static('public'));
app.use('/uploads/images', express.static('uploads/images'));

// Connect to DB
require("./config/mongo_db").connectDB();

//middleware
app.use(cors());

// parse application/json
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", require("./routes"));
//server
app.use((req, res) => {
  res.status(404).send({ e: "404: Page not found" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server Up and running on port ${process.env.PORT}`)
);
