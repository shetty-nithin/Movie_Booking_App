const movieController = require("../controllers/movie.controller");
const {movieMiddleware} = require("../middlewares/index");
const {authJwt} = require("../middlewares/index");

module.exports = (app) => {
    app.post("/mba/api/v1/movies",[authJwt.verifyToken, authJwt.isAdmin, movieMiddleware.isValidReleaseStatus, movieMiddleware.isValidGenre], movieController.createMovie);
    app.get("/mba/api/v1/movies", [authJwt.verifyToken], movieController.getAllMovies);
    app.get("/mba/api/v1/movies/:id", [authJwt.verifyToken, movieMiddleware.isValidParamsId], movieController.getMovieById);
    app.put("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, movieMiddleware.isValidParamsId, movieMiddleware.isValidReleaseStatus, movieMiddleware.isValidGenre], movieController.updateMovie);
    app.delete("/mba/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, movieMiddleware.isValidParamsId], movieController.deleteMovie);
}