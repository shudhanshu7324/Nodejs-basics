const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require('./models/Person');

// server connection
const PORT = process.env.PORT || 3000;

const app = express();

// use middleware
app.use(bodyParser.json()); //req.body

// Middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next(); // move to next phase
};

// authentication logic using passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // authentication logic
    try {
      console.log('Received Credentials: ',username, password);
      const user = await Person.findOne({username: username});
      if(!user){
        return done(null,false,{message: 'Incorrect username'})
      }

      const isPasswordMatch = user.password === password ? true : false;

      if(isPasswordMatch){
        return done(null,user);
      }else{
        return done(null,false,{message: 'Incorrect Password'})
      }
    } catch (error) {
      return done(error);
    }
  })
);

// USING LOGREQUEST
app.use(logRequest);
app.use(passport.initialize());

// request
app.get("/",passport.authenticate('local',{session:false}) ,logRequest, (req, res) => {
  res.send("Hello Port 3000");
});

// Import router files
const personRoutes = require("./routes/personRoutes");
app.use("/api/person", personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menuitem", menuRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
