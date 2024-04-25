const express = require('express');
const router = express.Router();

// connection
const MenuItem = require("../models/MenuItem");

// Menuitem api
router.post('/menuitem',async(req,res) => {
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
  
  router.get('/menuitem',async(req,res)=>{
    try {
      const data = await MenuItem.find();
      console.log("Data Fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  module.exports = router;