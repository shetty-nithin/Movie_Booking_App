const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");
const constants = require("../utils/constants");

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "Please login for the token."
        });
    }
    
    // Validating for valid token
    jwt.verify(token, authConfig.SecretKey, async (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "unauthorized!"
            });
        }
        const user = await User.findOne({userId : decoded.id});
        req.user = user;
        // req.userId = decoded.id;
        next();
    })
}

const isValideUserReqParams = async (req, res, next) => {
    try {
        const user = await User.findOne({userId : req.params.id})
        if(!user){
            return res.status(400).send({
                message : "User_Id passed is not present in the database."
            })
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}
const isAdmin = (req, res, next) => {
    const user = req.user;
    
    if(user && user.userType == constants.userTypes.admin){
        next();
    }
    else{
        return res.status(403).send({
            message : "Only admin can request for this."
        });
    }
}


const isAdminOrOwner = (req, res, next) => {
    try{
        const callingUser = req.user;
        if(callingUser.userType === constants.userTypes.admin || callingUser.userId === req.params.id){
            next();
        }
        else{
            return res.status(403).send({
                message : "Only the admin or the owner are allowed to make this request."
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

const isTheatreOwnerOrAdmin = async (req,res,next)=>{
    try {
        const allowedUserTypes = [constants.userTypes.theatre_owner, constants.userTypes.admin];
        
        if(allowedUserTypes.includes(req.user.userType)){
            next();
        }
        else{
            return res.send(403).send({
                message : "Only the admin or the theatre owner are allowed to make this request."
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

const isValidTheatreOwner = async (req,res,next)=>{
    try {
        if(req.user.userType === constants.userTypes.theatre_owner){
            const theatre = await Theatre.findOne({_id : req.params.id});

            if (theatre.ownerId.equals(req.user._id)){
                next();
            }
            else{
                return res.send(403).send({
                    message : "Only the owner of this theatre is allowed to make this request"
                })
            }
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

module.exports = {verifyToken, isAdmin, isValideUserReqParams, isAdminOrOwner, isTheatreOwnerOrAdmin, isValidTheatreOwner};