const mongoose = require("mongoose");
const {bookingStatus} = require("../utils/constants");

const bookingSchema = new mongoose.Schema({
    totalCost : {
        type : Number,
    },
    theatreId : {
        type : mongoose.SchemaTypes.ObjectId,
    },
    movieId : {
        type : mongoose.SchemaTypes.ObjectId
    },
    userId : {
        type : String,
    },
    timing : {
        type : Date,
    },
    status : {
        type : String,
        enum : [bookingStatus.in_progress, bookingStatus.completed, bookingStatus.cancelled, bookingStatus.failed],
        default : bookingStatus.in_progress
    },
    numberOfSeats : {
        type : Number,
        require : true
    }
}, {timestamps : true, versionKey : false});

module.exports =  mongoose.model("Booking", bookingSchema);