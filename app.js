
require("dotenv").config();

const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");

const gameRoutes = require("./routes/gameRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const managerRoutes = require("./routes/managerRoutes.js");
const { startBot } = require("./bot/bot.js");

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

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
});

app.use(sessionMiddleware);

// Routes
app.use("/", gameRoutes);
app.use("/", authRoutes);
app.use("/", managerRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server);

// Share login sessions with Socket.IO
io.engine.use(sessionMiddleware);

// Handle WebSocket connections
io.on("connection", (socket) => {

    // Only allow logged-in managers to receive activity
    if (!socket.request.session?.managerId) {
        socket.disconnect(true);
        return;
    }

    socket.join("managers");

    console.log("Manager connected to Socket.IO");

    socket.on("disconnect", () => {
        console.log("Manager disconnected from Socket.IO");
    });
});

// Start Discord bot
startBot(io);

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
