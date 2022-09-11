const mongoose = require("mongoose");
const {showTypes} = require("../utils/constants");

const theatreSchema = new mongoose.Schema({
    ownerId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : "User"
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    pinCode : {
        type : Number,
        required : true
    },
    showTypes : {
        type : [String],
        required : true,
        enum : [showTypes.morning, showTypes.noon, showTypes.evening, showTypes.night]
    },
    numberOfSeats : {
        type : Number,
        required : true
    },
    movies : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "Movie"
    }
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model("Theatre", theatreSchema);