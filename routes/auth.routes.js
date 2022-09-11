const authController = require("../controllers/auth.controller");
const {verifyAuth} = require("../middlewares");

module.exports = (app) => {
    app.post("/mba/api/v1/auth/signup", [verifyAuth.validateSignUpRequestBody], authController.signup);
    app.post("/mba/api/v1/auth/signin", [verifyAuth.validateSignInRequestBody], authController.signin);
}