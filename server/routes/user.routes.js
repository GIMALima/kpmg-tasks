const router = require("express").Router();
const userController = require("../controllers/user.controller");

// Endpoint for user registration.
router.post("/signup", userController.signup);

// Endpoint for user authentication.
router.post("/signin", userController.signin);

// Endpoint for user logout.
router.get("/logout", userController.logout);

// Endpoint to get user.
router.get("/:id", userController.fetchUser);

module.exports = router;
