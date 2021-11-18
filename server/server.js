const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
const noteRoutes = require("./routes/note.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// Create express app.
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

// Middlewares.
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("common"));
app.use(express.json({ limit: "30mb", extended: true })); // Parse request data content type application/json.
app.use(express.urlencoded({ limit: "30mb", extended: true })); // Parse request data content type application/x-www-form-urlencoded.
app.use(cookieParser());

// Json Web Token.
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.send(res.locals.user);
});

// Define root route.
app.get("/", (req, res) => {
  res.send("Hello to KPMG TASKS App REST API");
});

// Routes.
app.use("/api/user/", userRoutes);
app.use("/api/task/", taskRoutes);
app.use("/api/note/", noteRoutes);

// Setup the server port.
const PORT = process.env.PORT || 5000;

// Listen to the port.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
