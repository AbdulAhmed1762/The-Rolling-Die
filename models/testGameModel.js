const gameModel = require("./gameModel.js");
const db = require("../database/database.js");

gameModel.getAllGames((err, rows) => {

    if (err) {
        console.error("Database error:", err.message);
    } else {
        console.log("Retrieved games:", rows);
    }

    db.close();
});