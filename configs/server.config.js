if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

module.exports = {
    PORT : process.env.PORT,
    BOOKING_APP_URL: process.env.BOOKING_APP_URL
}