const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const constants = require("../utils/constants");


exports.createPayment = async (req, res) => {
    try {
        const paymentObj = {
            userId : req.user.userId,
            bookingId : req.body.bookingId,
            amount : req.body.amount,
            status : req.body.status,
        }

        const paymentPaid = await Payment.create(paymentObj);
        req.user.payments.push(paymentPaid._id);
        req.user.save();

        const booking = await Booking.findOne({_id : req.body.bookingId});
        const date = new Date(booking.timing);
        const milliseconds = date.getTime() + 120000;

        if(Date.now() < milliseconds){
            booking.status = constants.bookingStatus.completed;
            await booking.save();
            paymentPaid.status = constants.paymentStatus.completed;
            await paymentPaid.save();
        }
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
        
        if(!queryObj){
            return res.status(404).send({
                message : "No payments yet."
            })
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
        const payment = req.payment;

        if(!payment){
            return res.status(404).send({
                messaage : "No payment with this Id"
            })
        }
        
        return res.status(200).send(payment);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting the payments by ID : ${err}`
        })
    }
};

