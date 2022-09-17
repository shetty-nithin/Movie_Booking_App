const bookingController = require("../controllers/booking.controller");
const {authJwt, bookingMiddleware} = require("../middlewares/index");

module.exports = (app) => {
    app.post("/mba/api/v1/bookings", [authJwt.verifyToken], bookingController.bookTicket);
    app.get("/mba/api/v1/bookings", [authJwt.verifyToken], bookingController.getAllBookings);
    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken, bookingMiddleware.isValidParamsId, bookingMiddleware.isValidUserOrAdmin], bookingController.getBookinById);
    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken, bookingMiddleware.isValidParamsId, bookingMiddleware.isValidUserOrAdmin], bookingController.updateBooking);
}