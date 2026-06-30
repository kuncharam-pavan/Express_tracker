const  mongoose = require("mongoose")

const user = require("../model/User")

const jwt = require("jsonwebtoken")

const bcrypt =require("bcryptjs")
const { validationResult } = require("express-validator")

exports.allusers = async(req,res)=>{
    try {
       const data = await user.find() 
       res.json({msg:"complete data ",data:data})
    } catch (error) {
        res.json({msg:"something wrong",error:error})
    }
}


exports.updateuser = async(req,res)=>{

    const {id} = req.params
    
    const {name,email,password,role} = req.body || {}

    try {
        if(!id){
        return res.json({msg:"id is mandatory/enter valid id"})
        }

     
        const checkdata = await user.findById(id)
        if(!checkdata){
            return res.json({msg:"user not found"})
        }
        if(!name && !email && !password && !role){
            return res.json({
                msg:"not given any feild to update name/email/password"
            })
        }
        const updatedata = await user.findByIdAndUpdate(
                id,
                {
                    name:name,
                    email:email,
                    password:password,
                    role:role
                },
                {
                    new:true     // retuns updated data 
                }
            )
            res.json({msg:"updated user successfully",data:updatedata})
    } catch (error) {
        res.json({msg:"something wrong",error:error.message}) 
    }
}
exports.deleteuser = async(req,res)=>{
    
    const{id} =  req.params
    try {
        // add in validation middleware
    //     if(!mongoose.Types.ObjectId.isValid(id)){
    //             return res.json({
    //              msg:"invalid user id"
    //     })
    // }
        const check = await user.findById(id)
        if(!check){
            return res.json({msg:"user not found or invalid id"})
        }
       
        const deleteuser = await user.findByIdAndDelete(id)
        res.json({msg:"data deleted successfully",deletedata:deleteuser})
    } catch (error) {
       res.json({msg:"something wrong",error:error.message})  
    }
}






exports.signup = async(req,res)=>{
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {name,email,password} = req.body
        // console.log(req.body);
        
        const checkuser = await user.findOne({email:email})
        if(checkuser){
            return res.status(400).json({msg:"you are alredy old user"})
        }
        const hashpass = await  bcrypt.hash(password,12)
        // console.log(hashpass);
        const data = await user.create({
            name:name, 
            email:email,
            password:hashpass
        })
        res.json({msg:"signup has done",data:data})
        
    } catch (error) {
        res.json({msg:"something wrong",error:error.message})
    }
}


// token generaeted in login only 
 // this data is came from authorization has stored the user data 
//         console.log(req.userauthdata)

exports.login = async(req,res)=>{

    const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

       try {
         const {email,password} = req.body

        const check = await user.findOne({email:email})
        // console.log("this is login checkdata -p",check);
        
        if(!check){
            return res.status(400).json({msg:"signup first"})
        }
        const checkpassword = await bcrypt.compare(password,check.password)
        if(!checkpassword){
            return res.status(400).json({
                msg:"invalid password"
            })
        }

       
        const token  = jwt.sign(
            {data:check},
            "hefurqghnuqiw",
            {algorithm:"HS256",expiresIn:"24h"
            }
        )
        res.json({msg:"successfully login ",token:token})
       } catch (error) {
            res.status(500).json({msg:"something wrong",error:error.message})
       }
}