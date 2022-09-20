const mongoose = require("mongoose");
const constants = require("../utils/constants");

const paymentShema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "Movie"
    },
    userId: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required : true,
        default: constants.paymentStatus.in_progress,
        enum: [constants.paymentStatus.cancelled, constants.paymentStatus.completed, constants.paymentStatus.failed, constants.paymentStatus.in_progress]
    }
 }, { timestamps : true , versionKey : false});


module.exports = mongoose.model("Payment", paymentShema);