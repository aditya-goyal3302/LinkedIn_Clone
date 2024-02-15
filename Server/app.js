const express = require('express');     
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

//config
dotenv.config();

// Connect to DB
require('./config/mongo_db').connectDB()

//middleware
app.use(cors());

// parse application/json
app.use(express.json( { extended: true }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', require('./routes'));
//server
app.use((req, res) => {
    res.status(404).send({e:'404: Page not found'});

})

app.listen(process.env.PORT, 
    () => console.log(`Server Up and running on port ${process.env.PORT}`)
);
