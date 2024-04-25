const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require('dotenv').config()

const app = express();

// use middleware
app.use(bodyParser.json()); //req.body

// request
app.get("/", (req, res) => {
  res.send("Hello Port 3000");
});

// Import router files
const personRoutes = require('./routes/personRoutes');
app.use('/api/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menuitem',menuRoutes);


// server connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
