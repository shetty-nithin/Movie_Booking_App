const { bookingMiddleware } = require("../middlewares");
const constants = require("./constants");

module.exports = async (Movie, Theatre, User, Booking, Payment, bcrypt) => {
    try {
        
        await Movie.collection.drop();
        await Theatre.collection.drop();
        await User.collection.drop();
        await Booking.collection.drop();
        await Payment.collection.drop();

        const adminUser = await User.create({
            name : "admin",
            userId : "admin",
            password : bcrypt.hashSync("welcome1", 8),
            email : "admin@gmail.com",
            userType : "ADMIN",
        });
        const customer1 = await User.create({
            name : "cust1",
            userId : "c1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "shettynithin007@gmail.com",
            userType : "CUSTOMER",
        });
        const customer2 = await User.create({
            name : "cust2",
            userId : "c2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "cust2@gmail.com",
            userType : "CUSTOMER",
        });
        const theatreOwner1 = await User.create({
            name : "theatreOwner1",
            userId : "o1",
            password : bcrypt.hashSync("welcome1", 8),
            email : "theatreOwner1@gmail.com",
            userType : constants.userTypes.theatre_owner
        });
        const theatreOwner2 = await User.create({
            name : "theatreOwner2",
            userId : "o2",
            password : bcrypt.hashSync("welcome1", 8),
            email : "theatreOwner2@gmail.com",
            userType : constants.userTypes.theatre_owner
        });

        const movie1 = await Movie.create({
            name : "movie_1",
            description : "description of movie_1",
            casts : "cast of movie_1",
            trailerUrls : ["trailer_of_Movie_1"],
            posterUrls : ["poster_of_Movie_1"],
            language : ["Kannada", "English"],
            releaseDate : 2022-04-14,
            releaseStatus : constants.releaseStatuses.released,
            imdbRating : 9.8,
            genre : [constants.genres.scifi, constants.genres.fiction]
        });
        const movie2 = await Movie.create({
            name : "movie_2",
            description : "description of movie_2",
            casts : "cast of movie_2",
            trailerUrls : ["trailer_of_Movie_2"],
            posterUrls : ["poster_of_Movie_2"],
            language : ["Kannada", "English"],
            releaseDate : 2022-04-14,
            releaseStatus : constants.releaseStatuses.released,
            imdbRating : 9.8,
            genre : [constants.genres.scifi, constants.genres.fiction]
        });
        const movie3 = await Movie.create({
            name : "movie_3",
            description : "description of movie_3",
            casts : "cast of movie_3",
            trailerUrls : ["trailer_of_Movie_3"],
            posterUrls : ["poster_of_Movie_3"],
            language : ["Kannada", "English"],
            releaseDate : 2022-04-14,
            releaseStatus : constants.releaseStatuses.released,
            imdbRating : 9.8,
            genre : [constants.genres.scifi, constants.genres.fiction]
        });
    
        const theatre1 = await Theatre.create({
            ownerId : theatreOwner1._id,
            name : "theatre_1",
            description : "description about theatre_1",
            city : "Bengaluru",
            pinCode : "560024",
            showTypes : [constants.showTypes.morning, constants.showTypes.evening],
            numberOfSeats : 300
        });
        const theatre2 = await Theatre.create({
            ownerId : theatreOwner2._id,
            name : "theatre_2",
            description : "description about theatre_2",
            city : "Bengaluru",
            pinCode : "560024",
            showTypes : [constants.showTypes.morning, constants.showTypes.evening],
            numberOfSeats : 300
        });
        const theatre3 = await Theatre.create({
            ownerId : theatreOwner2._id,
            name : "theatre_3",
            description : "description about theatre_3",
            city : "Bengaluru",
            pinCode : "560024",
            showTypes : [constants.showTypes.morning, constants.showTypes.evening],
            numberOfSeats : 300
        });
        const theatre4 = await Theatre.create({
            ownerId : theatreOwner2._id,
            name : "theatre_4",
            description : "description about theatre_4",
            city : "Bengaluru",
            pinCode : "560024",
            showTypes : [constants.showTypes.morning, constants.showTypes.evening],
            numberOfSeats : 300
        });

        const booking1 = await Booking.create({
            "totalCost" : 550,
            "theatreId" : theatre1._id,
            "movieId" : movie1._id,
            "userId" : "c1",
            "timing" : Date.now(),
            "status" : constants.bookingStatus.in_progress,
            "numberOfSeats" : 2,
        });
        const booking2 = await Booking.create({
            "totalCost" : 270,
            "theatreId" : theatre3._id,
            "movieId" : movie2._id,
            "userId" : "c2",
            "timing" : Date.now(),
            "status" : constants.bookingStatus.in_progress,
            "numberOfSeats" : 1,
        });
        const booking3 = await Booking.create({
            "totalCost" : 870,
            "theatreId" : theatre3._id,
            "movieId" : movie2._id,
            "userId" : "c2",
            "timing" : Date.now(),
            "status" : constants.bookingStatus.in_progress,
            "numberOfSeats" : 3,
        });
    

        movie1.theatres.push(theatre1._id, theatre2._id, theatre3._id);
        await movie1.save();
        movie2.theatres.push(theatre1._id, theatre2._id, theatre3._id, theatre4._id);
        await movie2.save();
        movie3.theatres.push(theatre1._id, theatre2._id);
        await movie3.save();
    
        theatre1.movies.push(movie1._id, movie2._id, movie3._id);
        await theatre1.save();
        theatre2.movies.push(movie1._id, movie2._id, movie3._id);
        await theatre2.save();
        theatre3.movies.push(movie1._id, movie2._id);
        await theatre3.save();
        theatre4.movies.push(movie2._id);
        await theatre4.save();

        theatreOwner1.theatresOwned.push(theatre1._id);
        await customer1.save();
        theatreOwner2.theatresOwned.push(theatre2._id, theatre3._id, theatre4._id);
        await customer2.save();

        customer1.bookings.push(booking1._id);
        await customer1.save();
        customer2.bookings.push(booking2._id, booking3._id);
        await customer2.save();
    }
    catch (err) {
        console.log({
            message : "error while initialising with dummy data : " + err
        })
    }
}