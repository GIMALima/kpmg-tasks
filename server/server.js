const express = require("express");
const dotenv = require("dotenv");

// Create express app.
const app = express();
dotenv.config();

// Middleware.
app.use(express.json({ limit: "30mb", extended: true })); // Parse request data content type application/json.
app.use(express.urlencoded({ limit: "30mb", extended: true })); // Parse request data content type application/x-www-form-urlencoded.

// Define root route.
app.get("/", (req, res) => {
  res.send("Hello to KPMG Task App REST API");
});

// Setup the server port.
const PORT = process.env.PORT || 5000;

// Listen to the port.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
