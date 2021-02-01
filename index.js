const xlsx=require('xlsx');
const express=require('express');
const mongoose=require('mongoose');
const data1=require('./datacontroller');
const bodyparser=require('body-parser');
const path=require('path');
const fileupload = require("express-fileupload");
const routf=require('./routf');
const app=new express();
const DB="mongodb+srv://Shivangi:Zigzag1097@cluster0.y1ibt.mongodb.net/firstdb?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(con=>console.log("Successfully connected!!"));
app.use(express.json());
app.use(fileupload());
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views'));
app.set("view engine","hbs");
app.use(express.static(__dirname + '/public'));
//
app.listen(process.env.port1 || 7888,()=>{
    console.log("Waiting for requset!");
});
app.route("/").get(routf.sendpage);
app.route("/upload").post(data1.store);
app.route("/search1").post(data1.getdata1);
app.route("/search2").post(data1.getdata2);
app.route("/search3").post(data1.getdata3);
app.route("/fulldata").get(data1.getdata);

