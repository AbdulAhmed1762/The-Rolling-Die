const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path to our SQLite database file
const dbPath = path.join(__dirname, "rollingdie.db");

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

module.exports = db;