const express = require("express")
const router = express.Router()
const {transvalidation} =  require("../validators/transvalidation")
const {authentication} = require("../middleware/authentication")
// all controllers
const {alltrans,addtrans,deltrans} = require("../controllers/trans_Controller")


// get all transaction
router.get("/alltrans",alltrans)

// add transaction
router.post("/addtrans",authentication,transvalidation,addtrans)
// delete transction
router.delete("/deletetrans/:id",authentication,deltrans)

module.exports = router