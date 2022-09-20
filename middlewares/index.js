const movieMiddleware = require("./movie.middleware");
const theatreMiddleware = require("./theatre.middleware");
const authJwt = require("./auth.jwt");
const verifyAuth = require("./verifyAuth");
const bookingMiddleware = require("./booking.middleware");
const paymentMiddleware = require("./payment.middleware");

module.exports = {
    movieMiddleware,
    theatreMiddleware,
    authJwt,
    verifyAuth,
    bookingMiddleware,
    paymentMiddleware
}