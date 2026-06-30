const express = require("express")
const router = express.Router()
const {allusers,createuser,updateuser,deleteuser,signup,login}  = require("../controllers/user_controller")
const {authentication} = require("../middleware/authentication")
const {authorization} = require("../middleware/authorization")
const {signup_validation,login_validation} = require("../validators/uservalidators")
router.post("/signup",signup_validation,signup)
router.post("/login",login_validation,login)
router.get("/allusers",authentication,authorization("admin"),allusers)
router.patch("/updateuser/:id",authentication,authorization("user"),updateuser)
router.delete("/deleteuser/:id",authorization("admin"),deleteuser)


module.exports = router