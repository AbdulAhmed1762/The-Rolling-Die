const gameModel = require("../models/gameModel.js");

// Display manager dashboard
function showDashboard(req, res) {

    gameModel.getAllGames((err, games) => {

        if(err) {
            console.error("Error retrieving games:", err.message);
            return res.status(500).send("Database error");
        }


        res.render("dashboard", {
            title: "Manager Dashboard",
            games: games
        });
    });



}


    module.exports = {
        showDashboard
    }