const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const constant = require("../utils/constants");

exports.createTheatre = async (req, res) => {
    try {
        const theatreObj = {
            ownerId : req.user.userType === constant.userTypes.admin ? req.user.ownerId : req.user._id  ,
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pinCode : req.body.pinCode,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats
        }
        const createdTheatre = await Theatre.create(theatreObj);
        const theatreOwner = await User.findOne({_id : this.createdTheatre.ownerId});
        
        theatreOwner.theatresOwned.push(createdTheatre._id);
        await theatreOwner.save();
        
        return res.status(201).send(createdTheatre);
        
    } catch (err) {
        res.status(500).send({
            message : `Internal server error while creating the theatre : ${err}`
        }); 
    }
}

exports.getAllTheatre = async (req, res) => {
    try {
        const theatres = await Theatre.find({});
        return res.status(200).send(theatres);
    }
    catch (err) {
        res.status(500).send({
            message : `Internal server error while getting all the theatres : ${err}`
        }); 
    }
}

exports.getTheatreById = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});
        return res.status(200).send(theatre);
        
    } catch (err) {
        res.status(500).send({
            message : `Internal server error while getting the theatre by ID : ${err}`
        });
    } 
}

exports.updateTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});
        
        theatre.name = req.body.name ? req.body.name : theatre.name;
        theatre.description = req.body.description ? req.body.description : theatre.description;
        theatre.city = req.body.city ? req.body.city : theatre.city;
        theatre.pinCode = req.body.pinCode ? req.body.pinCode : theatre.pinCode;
        theatre.showTypes = req.body.showTypes ? req.body.showTypes : theatre.showTypes;
        theatre.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats;
        
        const updatedTheatre = await theatre.save();
        return res.status(200).send(updatedTheatre);
        
    } catch (err) {
        res.status(500).send({
            message : `Internal server error while updating the theatre : ${err}`
        });
    } 
}

exports.deleteTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});
        const theatreOwner = await User.findOne({_id : theatre.ownerId});

        theatreOwner.theatresOwned.remove(theatre._id);
        await theatreOwner.save();

        await theatre.remove();

        return res.status(200).send({
            message : `Theatre ${req.params.id} is deleted successfully.`
        })
    }
    catch (err) {
        res.status(500).send({
            message : `Internal server error while deleting the theatre : ${err}`
        }); 
    } 
}

exports.getAvailableMovies = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});
        const movies = await Movie.find({_id : theatre.movies});

        return res.status(200).send(movies);
    }
    catch (err) {
        res.status(500).send({
            message : `Internal server error while getting all the movies in the theatre : ${err}`
        }); 
    } 
};

exports.updateMoviesInTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({_id : req.params.id});

        if(req.body.addMovies){
            req.body.addMovies.forEach(movie => {
                theatre.movies.push(movie);
            });
            
            req.body.addMovies.forEach(async movie => {
                let temp = await Movie.findOne({_id : movie});
                temp.theatres.push(theatre._id);
                await temp.save();
            })
        }

        if(req.body.removeMovies){
            req.body.removeMovies.forEach(async (movie) => {
                await theatre.movies.remove(movie);
            });

            req.body.removeMovies.forEach(async movie => {
                let temp = await Movie.findOne({_id : movie});
                await temp.theatres.remove(theatre._id);
                await temp.save();
            })
        }

        await theatre.save();
        res.status(200).send({
            message : "adding/removing of movies in the theatre is done successfully."
        })
    }
    catch (err) {
        res.status(500).send({
            message : `Internal server error while updating the movies in the theatre : ${err}`
        }); 
    } 
}