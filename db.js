const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";


// Setup MongoDB connection
mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connection established");
});

db.on('disconnected', () => {
    console.log("MongoDB connection disconnected");
});

db.on('error', (error) => {
    console.log("Error in MongoDB connection", error);
});

module.exports = db;
