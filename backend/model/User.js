const mongoose = require("mongoose")
const user_schema =  new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    role:{type:String,
        enum:["user","admin"],
        default:"user"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const user = mongoose.model("user_model",user_schema)
module.exports = user