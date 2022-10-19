const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const constants = require("../utils/constants");
const mailTypes = require("../utils/mailTypes");

exports.createPayment = async (req, res) => {
    try {
        const paymentObj = {
            bookingId : req.body.bookingId,
            amount : req.body.amount,
            status : req.body.status,
        }

        const paymentPaid = await Payment.create(paymentObj);
        await req.user.payments.push(paymentPaid._id);
        await req.user.save();

        const booking = await Booking.findOne({_id : paymentPaid.bookingId});
        
        if(paymentPaid.status === constants.paymentStatus.completed){
            booking.status = constants.bookingStatus.completed;
            mailTypes.paymentSuccessfull("shettynithin007@gmail.com", paymentPaid); // this line of code is for sending a notification.
        }
        else{
            booking.status = constants.bookingStatus.cancelled;
            mailTypes.paymentFailed("shettynithin007@gmail.com", paymentPaid); // this line of code is for sending a notification.
        }
        await booking.save();
        res.status(201).send(paymentPaid); 
    } 
    catch(err){
        return res.status(500).send({
            message : `Internal server error while paying the amount : ${err}`
        })
    }
};

exports.getAllPayment = async (req, res) => {
    try {
        let queryObj = {};

        if(req.user.userType === constants.userTypes.customer){
            queryObj["_id"] = {$in : req.user.payments};
        }

        const payments = await Payment.find(queryObj);
        return res.status(200).send(payments);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting all the payments : ${err}`
        })
    }
};

exports.getPaymentById = (req, res) => {
    try {
        return res.status(200).send(req.payment);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting the payments by ID : ${err}`
        })
    }
};

