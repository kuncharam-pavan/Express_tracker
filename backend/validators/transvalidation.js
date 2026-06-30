const {body} = require("express-validator")
exports.transvalidation = [
    body("title")
    .notEmpty().withMessage("enter the title")
    .isAlpha().withMessage("only alphabets only"),
    body("amount")
    .notEmpty().withMessage("enter the amount")
    .isNumeric().withMessage("only numbers")
]