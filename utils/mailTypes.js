const sendNotificationReq = require("./notificationClient");
const serverConfig = require("../configs/server.config");

exports.paymentSuccessfull = (recievers, payment) =>{
    sendNotificationReq(
        "Ticket booked successfully!", 
        `Rs ${payment.amount} has been deducted from your bank account towards booking movie tickets.`,
        recievers, 
        "Movie_Booking_App"
    );
}

exports.paymentFailed = (recievers, payment) => {
    sendNotificationReq(
        "Payment failed. Please try again.",
        `Payment of Rs ${payment.amount} has failed. Please click here ${serverConfig.BOOKING_APP_URL}/mba/api/v1/bookings to book again`,
        recievers,
        "Movie_Booking_App"
    );
}

exports.bookingCancelled = (recievers) => {
    sendNotificationReq(
        "Booking Cancelled.",
        `Your booking has been cancelled. Click here ${serverConfig.BOOKING_APP_URL}/mba/api/v1/bookings to book again`,
        recievers,
        "Movie_Booking_App"
    );
}

exports.bookingTimedOut = (recievers) => {
    sendNotificationReq(
        "Booking Timed out.",
        `Booking cancelled due to delay in payment. Click here ${serverConfig.BOOKING_APP_URL}/mba/api/v1/bookings to book again.`,
        recievers,
        "Movie_Booking_App"
    );
}