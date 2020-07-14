const mongoose=require('mongoose');

//scheme create
const BigClassSchema=new mongoose.Schema({
    classnum:{
        type:Number,
        required:true,
        trim:true
    },
    title :{
        type:String,
        required:true,
        trim:true
    }
});

module.exports=mongoose.model("bigclass",BigClassSchema);