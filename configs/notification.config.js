if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

module.export = {
    NOTIFICATION_REST_URL : process.env.NOTIFICATION_REST_URL
}