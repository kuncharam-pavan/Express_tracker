const {body} = require("express-validator")
exports.signup_validation =[
    
    body("name").notEmpty().withMessage("name is mandatory").isString().withMessage("name must be string").isLength({min:4,max:6}).withMessage("name should be minimum 4 and max 6"),
    body("email").notEmpty().withMessage("email is mandatory").isEmail().withMessage("enter the valid mail"),
    body("password")
        .notEmpty().withMessage("password is mandatory")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/).withMessage("Password must contain 1 capital letter, 4 small letters, 1 special symbol and 3 numbers")
]

exports.login_validation =[
    
    body("email").notEmpty().withMessage("email is mandatory").isEmail().withMessage("enter the valid mail"),
    body("password")
        .notEmpty().withMessage("password is mandatory")
       .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/).withMessage("Password must contain 1 capital letter, 4 small letters, 1 special symbol and 3 numbers")
]