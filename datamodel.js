const mongoose=require('mongoose');
const dataschema=new mongoose.Schema({
    Name:String,
    Roll_no:{
        type:String,
        unique:[true,"Name not"]
    },
   
    Class:Number
});
module.exports=mongoose.model("datastore23",dataschema);