const mongoose=require('mongoose');

//scheme create
const QuizSchema = new mongoose.Schema({
    job: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    bigclass: {
        type: Number ,
        required: true,
        trim: true,
    },
    middleclass:{
        type: Number ,
        required: true,
        trim: true,
    },
});

module.exports=mongoose.model("quiz", QuizSchema);