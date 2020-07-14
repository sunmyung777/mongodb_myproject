const mongoose=require('mongoose');

//scheme create
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    maxscore:{
        type:Number,
        default:0
    },
    role: {
        type: Number,
        default: 0, // 0: 일반사용자 1: 관리자
    },
    token: {
        type: String,
    }
});

module.exports=mongoose.model("user", UserSchema);