const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");

exports.findAll = async (req, res) => {
    const queryObj = {};
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if(userTypeQP){
        queryObj.userType = userTypeQP;
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP;
    }

    try {
        const users = await User.find(queryObj);
        return res.status(200).send(objectConverter.multipleUserResponse(users));

    }catch(err){
        return res.status(500).send({
            message : "Internal server error while finding all the users : " + err
        })
    }
}

exports.findByUserId = async (req, res) => {
    try {
        const user = await User.findOne({userId : req.params.id});
        return res.status(200).send(objectConverter.singleUserResponse(user));

    }catch(err){
        return res.status(500).send({
            message : "Internal server error while finding an user bu ID : " + err
        })
    }
}   

exports.update = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.params.id});
        const callinUser = await User.findOne({userId : req.user.userId});

        user.name = req.body.name ? req.body.name : user.name;
        if((req.body.userType || req.body.userStatus) && callinUser.userType === constants.userTypes.admin){
            user.userType = req.body.userType ? req.body.userType : user.userType;
            user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus;
        }
        else if((req.body.userType || req.body.userStatus) && callinUser.userType !== constants.userTypes.admin){
            return res.status(401).send({
                message : "unauthorized! Login as admin"
            })
        }

        const updatedUser = await user.save();
        res.status(200).send(objectConverter.singleUserResponse(updatedUser));

    }catch(err){
        return res.status(500).send({
            message : "Internal server error while updating the user : " + err
        })
    }
}