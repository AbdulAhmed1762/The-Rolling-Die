
require("dotenv").config();

const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const session = require("express-session");

const gameRoutes = require("./routes/gameRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const managerRoutes = require("./routes/managerRoutes.js");

const app = express();
const PORT = 3000;

// Configure Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Configure sessions for manager login
if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing from .env");
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}));

// Routes
app.use("/", gameRoutes);
app.use("/", authRoutes);
app.use("/", gameRoutes);
app.use("/", authRoutes);
app.use("/", managerRoutes);



// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
