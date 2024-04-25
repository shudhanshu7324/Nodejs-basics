const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");

const app = express();

// connection
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

// use middleware
app.use(bodyParser.json()); //req.body

// request
app.get("/", (req, res) => {
  res.send("Hello Port 3000");
});

// app.post("/person", (req, res) => {
//   const data = req.body; // Assumingthe request body contains the person data

// Create a new person documentusing the mongoose model
// const newPerson = new Person();
// newPerson.name = data.name;
// newPerson.age = data.age;
// newPerson.mobile = data.mobile;
// newPerson.email = data.email;
// newPerson.address = data.address;
// newPerson.salary = data.salary;
// to avoid all the complexity we directly write

// const newPerson = new Person(data);

//Save the newPerson into the database
// newPerson.save((error, savedPerson) => {
//   if (error) {
//     console.log("Error in saving Person data ", error);
//     res.status(500).json({ error: "Internal Server error" });
//   } else {
//     console.log("Data saved successfully");
//     res.status(200).json(savedPerson);
//   }
// });
// });

// person api
app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    console.log("data saved", savedPerson);
    res.status(200).json(savedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Menuitem api
app.post('/menuitem',async(req,res) => {
  try{
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("data saved: ",savedMenuItem);
    res.status(200).json(savedMenuItem);
  }catch(error){
    console.log(error);
    res.status(500).json({error: "Internal server error"})
  }
})

app.get('/menuitem',async(req,res)=>{
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
