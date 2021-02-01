const mongoose=require('mongoose');
const dataschema=new mongoose.Schema({
    Name:String,
    Roll_no:String,
    Class:Number
});
module.exports=mongoose.model("datastore89",dataschema);