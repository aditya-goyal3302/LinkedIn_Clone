const express = require('express');     
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
// Connect to DB
require('./config/mongo_db');
//middleware
app.use(cors());
app.use(express.json( { extended: true }));
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/', require('./routes'));

app.listen(process.env.PORT, 
    () => console.log(`Server Up and running on port ${process.env.PORT}`)
);
