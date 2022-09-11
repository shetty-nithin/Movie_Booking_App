const theatreController = require('../controllers/theatre.controller');
const {authJwt, theatreMiddleware} = require("../middlewares/index");
 
 module.exports = (app)=>{
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, theatreMiddleware.isValidShowTypes], theatreController.createTheatre);
    app.get("/mba/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatre);
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken, theatreMiddleware.isValidParamsId], theatreController.getTheatreById);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, theatreMiddleware.isValidParamsId, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner, theatreMiddleware.isValidShowTypes], theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, theatreMiddleware.isValidParamsId, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.deleteTheatre);

    app.get("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, theatreMiddleware.isValidParamsId], theatreController.getAvailableMovies);
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, theatreMiddleware.isValidParamsId, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner], theatreController.updateMoviesInTheatre);
 }