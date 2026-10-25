const gameModel = require("../models/gameModel.js");

// Display all games
function showGames(req, res) {

    gameModel.getAllGames((err, games) => {

        if (err) {
            console.error("Error retrieving games:", err.message);
            return res.status(500).send("Database error");
        }

        res.render("inventory", {
            title: "The Rolling Die - Inventory",
            games: games
        });
    });
}

module.exports = {
    showGames
};