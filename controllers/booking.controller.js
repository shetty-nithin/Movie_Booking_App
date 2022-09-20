const Booking = require("../models/booking.model");
const constants = require("../utils/constants");

exports.bookTicket = async (req, res) => {
    try {
        const ticketObj = {
            totalCost : req.body.totalCost,
            theatreId : req.body.theatreId,
            movieId : req.body.movieId,
            userId : req.user.userId,
            timing : Date.now(),
            status : req.body.status,
            numberOfSeats : req.body.numberOfSeats
        }
    
        const ticketBooked = await Booking.create(ticketObj);
        req.user.bookings.push(ticketBooked._id);
        await req.user.save();

        res.status(201).send(ticketBooked); 

        return setTimeout(async () => {
            const updatedBooking = await Booking.findOne({_id : ticketBooked._id});
            if(updatedBooking.status === constants.bookingStatus.in_progress){
                updatedBooking.status = constants.bookingStatus.cancelled;
                await updatedBooking.save();
            }
        }, 120000);

    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while booking the ticket : ${err}`
        })
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        let queryObj = {};

        if(req.user.userType === constants.userTypes.customer){
            queryObj["_id"] = {$in : req.user.bookings};
        }
        
        if(!queryObj){
            return res.status(404).send({
                message : "No bookings yet."
            })
        }

        const bookings = await Booking.find(queryObj);
        return res.status(200).send(bookings);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting all the bookings : ${err}`
        })
    }
};

exports.getBookinById = (req, res) => {
    try {
        const booking = req.booking;

        if(!booking){
            return res.status(404).send({
                messaage : "No booking with this Id"
            })
        }
        
        return res.status(200).send(booking);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting the bookings by ID : ${err}`
        })
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = req.booking;

        if(!booking){
            return res.status(404).send({
                messsage : "No booking with this Id."
            })
        }

        booking.totalCost = req.body.totalCost ? req.body.totalCost : booking.totalCost;
        booking.theatreId = req.body.theatreId ? req.body.theatreId : booking.theatreId;
        booking.movieId = req.body.movieId ? req.body.movieId : booking.movieId;
        booking.status = req.body.status ? req.body.status : booking.status;
        booking.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : booking.numberOfSeats;

        const updatedBooking = await booking.save();
        return res.status(200).send(updatedBooking);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while updating the bookings : ${err}`
        })
    }
};
