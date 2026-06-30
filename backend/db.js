const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = async() =>{
    try {
        await  mongoose.connect(process.env.mongo_uri, {dbName:process.env.dbName})
        console.log("database connected")
    } catch (error) {
        console.log("unable connect database " + error)
    }
}