const Theatre = require("../models/theatre.model");
const {showTypes} = require("../utils/constants");

const isValidParamsId = async (req, res, next) => {
    console.log("till4");
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});
        
        if(!theatre){
            return res.status(400).send({
                message : `No such theatre with id ${req.params.id} in the database.`
            })
        }
        req.theatre = theatre;
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

const isValidShowTypes = async (req, res, next) => {
    try{
        if(req.body.showTypes){
            const types = [showTypes.morning, showTypes.noon, showTypes.evening, showTypes.night];
            if(req.body.showTypes.every(g => !types.includes(g))){
                return res.status(400).send({
                    message : `Array contains one or more invalid showTypes.`
                })
            }
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    } 
}

module.exports = {isValidParamsId, isValidShowTypes}; 