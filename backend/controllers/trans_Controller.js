const user = require("../model/User")
const transcation = require("../model/transaction")
exports.alltrans = async(req,res)=>{
    try {
        const data = await transcation.find()
        res.json({msg:"all the transctions",data:data})

    } catch (error) {
       console.log(error);
    }
}

exports.addtrans =async (req,res)=>{

    try{
        // console.log(req.userauthdata);
        
        const{title,amount} = req.body
        const dataadd = await transcation.create({
            user_id :req.userauthdata._id,
            title:title,
            amount:amount,
        })
        res.json({msg:"your transaction is added",data:dataadd})
    }catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"something wrong",
            error:error.message
        })
    }
}

exports.deltrans = async(req,res)=>{
   try {
        const {id} = req.params
        const deldata =await transcation.findOneAndDelete({
            _id:id,
            user_id:req.userauthdata._id
        })
        if(!deldata){

         return res.json({
            msg:"transaction not found"
         })
      }
        res.json({msg:"delete transaction successfully ",deldata})
        
   } catch (error) {
        console.log(error);
          res.status(500).json({
            msg:"something wrong",
            error:error.message
        })
   }
}