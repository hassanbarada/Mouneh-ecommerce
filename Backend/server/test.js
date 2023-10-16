const express=require('express');
const authRoute=require('../routes/AuthRoutes');
const usersRoute=require('../routes/UsersRoute');
const ProductRoute =require("../routes/ProductRoute");
const workshopRoute =require("../routes/workshopRoute");
const userworkshopRoute =require("../routes/userworkshopRoute");
const mailRoute =require("../routes/mailRoute");
const cartRoute =require("../routes/cartRoute");
const StripeRoute=require("../routes/Stripe");
const messageRoute =require("../routes/messageRoute");
const chatRoute =require("../routes/chatRoutes");
const WorkshopStripe = require('../routes/workshopStripe');

const connect = require('./connect');
const cors=require('cors');
require('dotenv').config();
const app=express();

app.get("/",function(req,res){
 res.send("hello");
})

app.get("/contact",function(req,res){
    res.send("contact me on hassan@gmail.com");
   })

app.get("/about",function(req,res){
    res.send("hello i am hassan i have 21 years old");
   })



app.use(express.json(),cors());

app.use(authRoute,usersRoute,ProductRoute,workshopRoute,userworkshopRoute,mailRoute,cartRoute,StripeRoute,messageRoute,chatRoute);
app.use("/stripe", WorkshopStripe)

app.listen(process.env.PORT,function(){
    connect();
    console.log(`Server started on port ${process.env.PORT}`);
})