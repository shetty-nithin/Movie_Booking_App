const Payment = require("../models/payment.model");
const constant = require("../utils/constants");

const isValidParamsId = async (req, res, next) => {
    try {
        const payment = await Payment.findOne({_id : req.params.id});
        
        if(!payment){
            return res.status(400).send({
                message : "Invalid Id!"
            })
        }
        req.payment = payment;
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

const isValidUserOrAdmin = async (req,res,next)=>{
    try {
        if(req.user.userType === constant.userTypes.admin || req.user.userId === req.payment.userId){
            next();
        }
        else{
            return res.status(403).send({
                message : "Only the owner of this payment or admin is allowed to make this request"
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

module.exports = {isValidParamsId, isValidUserOrAdmin}; 