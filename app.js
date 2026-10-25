const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");

const gameRoutes = require("./routes/gameRoutes.js");

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

// Routes
app.use("/", gameRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});