const mongoose=require('mongoose');

//scheme create
const MiddleClassSchema=new mongoose.Schema({
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

module.exports=mongoose.model("middleclass",MiddleClassSchema);