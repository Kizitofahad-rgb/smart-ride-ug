const express = require("express");

const router = express.Router();


let trips = [];


router.get("/", (req,res)=>{


res.json(trips);


});



router.post("/",(req,res)=>{


const trip = {


id:
Date.now(),


bus:"BUS001",


location:req.body.location,


time:new Date()



};


trips.push(trip);



res.json({

message:"Trip saved",

trip

});



});



module.exports = router;