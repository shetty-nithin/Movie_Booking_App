const paymentController = require("../controllers/payment.controller");
const {authJwt, paymentMiddleware} = require("../middlewares/index");

module.exports = (app) => {
    app.post("/mba/api/v1/payments", [authJwt.verifyToken], paymentController.createPayment);
    app.get("/mba/api/v1/payments/:id", [authJwt.verifyToken, paymentMiddleware.isValidParamsId, paymentMiddleware.isValidUserOrAdmin], paymentController.getPaymentById);
    app.get("/mba/api/v1/payments", [authJwt.verifyToken], paymentController.getAllPayment);
}