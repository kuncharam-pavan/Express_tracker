// authorization==>roles
const User = require("../model/User")
exports.authorization = (...roles)=>{
    return async(req,res,next)=>{
        try {
            const userdata = await User.findById(req.userauthdata._id)
            // console.log("authorization.....",userdata);
            const checkrole = await roles.includes(userdata.role)
            // console.log(checkrole);
            if(checkrole){
                next()
            }
            else{
                res.json({msg:"your not access to this operation"})
            }
        } catch (error) {
            res.json({error:error.message})
        }
    }
}
