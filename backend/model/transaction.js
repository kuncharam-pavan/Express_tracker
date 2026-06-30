// title amount why the amount used(Salary,Petrol,Shopping)
const mongoose = require("mongoose")
const transaction_schema = new mongoose.Schema({
    title :{type:String,required:true},
    amount:{type:Number,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_model",
        required:true
    }
})

const transaction = mongoose.model("trans_model",transaction_schema)

module.exports = transaction