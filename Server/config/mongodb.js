const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const db = await mongoose.connect(`${process.env.DB_CONNECT}linked_in`);
        if(db) {
            console.log('Connected to MongoDB');
        }
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}
connectDB();
// exports db
module.exports = mongoose;
