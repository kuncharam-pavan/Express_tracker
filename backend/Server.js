const express = require("express")
const cors = require("cors")
const app = express()
const {connect} = require("./db.js")
require("dotenv").config()

connect()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// get the routes
const transactionroutes = require("./routes/transactionRoutes")
const userroutes = require("./routes/userRoutes")

app.use("/trans",transactionroutes)
app.use("/users",userroutes)


app.get("/maintransaction",(req,res)=>{
    res.send("main transaction")
})



app.listen(process.env.port,()=>{console.log(`server is started at port number${process.env.port}`);
})