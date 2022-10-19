const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");

exports.createMovie = async (req, res) => {
    try{
        const movieObj = {
            name : req.body.name,
            description : req.body.description,
            casts : req.body.casts,
            trailerUrls : req.body.trailerUrls,
            postUrls : req.body.postUrls,
            language : req.body.language,
            releaseDate : req.body.releaseDate,
            releaseStatus : req.body.releaseStatus,
            imdbRating : req.body.imdbRating,
            genre : req.body.genre
        }

        const createdMovie = await Movie.create(movieObj);
        return res.status(201).send(createdMovie);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while posting the Movie : ${err}`
        })
    }
}

exports.getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find({});
        
        if(!movies){
            return res.status(404).send({
                message : "No movies has been posted yet."
            })
        }
        
        return res.status(200).send(movies);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting all the the Movies : ${err}`
        })
    }
}

exports.getMovieById = async (req, res) => {
    try{
        return res.status(200).send(req.movie);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while getting the Movie by Id : ${err}`
        })
    }
}

exports.updateMovie = async (req, res) => {
    try{
        const movie = req.movie;
        movie.name = req.body.name ? req.body.name : movie.name;
        movie.description = req.body.description ? req.body.description : movie.description;
        movie.casts = req.body.casts ? req.body.casts : movie.casts;
        movie.trailerUrls = req.body.trailerUrls ? req.body.trailerUrls : movie.trailerUrls;
        movie.postUrls = req.body.postUrls ? req.body.postUrls : movie.postUrls;
        movie.language = req.body.language ? req.body.language : movie.language;
        movie.releaseDate = req.body.releaseDate ? req.body.releaseDate : movie.releaseDate;
        movie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : movie.releaseStatus;
        movie.imdbRating = req.body.imdbRating ? req.body.imdbRating : movie.imdbRating;
        movie.genre = req.body.genre ? req.body.genre : movie.genre;

        const updatedMovie = await movie.save();
 
        return res.status(200).send({
            message : "movie posted successfully",
            movieId : updatedMovie._id,
            updatedMovie
        })
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while updating the Movie : ${err}`
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try{
        const movie = req.movie;
        if(movie.theatres.length > 0){
            movie.theatres.forEach(async theatre => {
                let temp = await Theatre.findOne({_id : theatre});
                await temp.movies.remove(movie._id);
                temp.save();
            });
        }
        await movie.remove();

        return res.status(200).send({
            message : `movie ${req.params.id} has been deleted successfully.`
        })
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while deleting the Movie : ${err}`
        })
    }
}