const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");

const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model");
const User = require("./models/user.model");
const Booking = require("./models/booking.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to mongoDB.");
});
db.once("open", () => {
    console.log("Connected to mongoDB.");
    require("./utils/initialDummyData")(Movie, Theatre, User, Booking, bcryptjs);
});

require("./routes/auth.routes")(app);
require("./routes/movie.routes")(app);
require('./routes/theatre.routes')(app);
require('./routes/user.routes')(app);
require('./routes/booking.routes')(app);


app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port : ${serverConfig.PORT}`);
})