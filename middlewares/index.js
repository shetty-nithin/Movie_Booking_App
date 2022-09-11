const movieMiddleware = require("./movie.middleware");
const theatreMiddleware = require("./theatre.middleware");
const authJwt = require("./auth.jwt");
const verifyAuth = require("./verifyAuth");

module.exports = {
    movieMiddleware,
    theatreMiddleware,
    authJwt,
    verifyAuth
}