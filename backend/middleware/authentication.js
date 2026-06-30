    const jwt = require("jsonwebtoken")
    const user = require("../model/User")
    require("dotenv").config()
    exports.authentication = async(req,res,next)=>{
        try {
            const {authorization } = req.headers
            // console.log(authorization);
            
            if(!authorization){
                return res.status(401).json({msg:"not valid user/token"})
            }
            // res.send({authorization})
            // console.log(authorization);

            // split the token with baarer
            const token = authorization.split(" ")[1]
            const verify_token = jwt.verify(token,process.env.secret_key)
            // console.log(token)
            const user_vali = await user.findById(verify_token.data._id)
            // console.log(user_vali);
            if(!user_vali){
                return res.status(401).json({msg:"not valid user"})
            }
            // why only for req object it will be carry out entire data 
            req.userauthdata = user_vali
            next()
        } catch (error) {
            res.status(500).json({msg:"something wrong",error:error.message})
        }
    }