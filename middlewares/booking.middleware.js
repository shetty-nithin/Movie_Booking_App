const Booking = require("../models/booking.model");
const constant = require("../utils/constants");

const isValidParamsId = async (req, res, next) => {
    try {
        const booking = await Booking.findOne({_id : req.params.id});
        
        if(!booking){
            return res.status(400).send({
                message : "Invalid Id!"
            })
        }
        req.booking = booking;
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
        if(req.user.userType === constant.userTypes.admin || req.user.userId === req.booking.userId){
            next();
        }
        else{
            return res.status(403).send({
                message : "Only the owner of this booking and admin are allowed to make this request"
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