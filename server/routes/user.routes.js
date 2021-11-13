const router = require("express").Router();
const userController = require("../controllers/user.controller");

// Endpoint for user registration.
router.post("/signup", userController.signup);

module.exports = router;
