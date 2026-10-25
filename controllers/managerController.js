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

 // Display add game form
function showAddGame(req, res) {
    res.render("addGame", {
        title: "Add New Game"
    });
}

// Handle adding a new game
function addGame(req, res) {

    const { title, category, description, price, stock } = req.body;

    const gamePrice = Number(price);
    const gameStock = Number(stock);

    // Validate game information
    if (
        !title || !title.trim() ||
        !category || !category.trim() ||
        !description || !description.trim() ||
        String(price).trim() === "" ||
        String(stock).trim() === "" ||
        !Number.isFinite(gamePrice) ||
        gamePrice < 0 ||
        !Number.isInteger(gameStock) ||
        gameStock < 0
    ) {
        return res.status(400).render("addGame", {
            title: "Add New Game",
            error: "Please enter valid game information"
        });
    }

    const game = {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        price: gamePrice,
        stock: gameStock
    };

    gameModel.createGame(game, (err, gameId) => {

        if (err) {
            console.error("Error adding game:", err.message);
            return res.status(500).send("Database error");
        }

        res.redirect("/manager/dashboard");
    });
}

// Display edit game form
function showEditGame(req, res) {

    const gameId = req.params.id;

    gameModel.getGameById(gameId, (err, game) => {

        if (err) {
            console.error("Error retrieving game:", err.message);
            return res.status(500).send("Database error");
        }

        if (!game) {
            return res.status(404).send("Game not found");
        }

        res.render("editGame", {
            title: "Edit Game",
            game: game
        });
    });
}

// Handle updating an existing game
function editGame(req, res) {

    const gameId = req.params.id;
    const { title, category, description, price, stock } = req.body;

    const gamePrice = Number(price);
    const gameStock = Number(stock);

    // Validate game information
    if (
        !title || !title.trim() ||
        !category || !category.trim() ||
        !description || !description.trim() ||
        price === undefined || String(price).trim() === "" ||
        stock === undefined || String(stock).trim() === "" ||
        !Number.isFinite(gamePrice) ||
        gamePrice < 0 ||
        !Number.isInteger(gameStock) ||
        gameStock < 0
    ) {
        return res.status(400).send("Invalid game information");
    }

    const game = {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        price: gamePrice,
        stock: gameStock
    };

    gameModel.updateGame(gameId, game, (err, changes) => {

        if (err) {
            console.error("Error updating game:", err.message);
            return res.status(500).send("Database error");
        }

        if (changes === 0) {
            return res.status(404).send("Game not found");
        }

        res.redirect("/manager/dashboard");
    });
}

// Handle deleting a game
function deleteGame(req, res) {

    const gameId = req.params.id;

    gameModel.deleteGame(gameId, (err, changes) => {

        if (err) {
            console.error("Error deleting game:", err.message);
            return res.status(500).send("Database error");
        }

        if (changes === 0) {
            return res.status(404).send("Game not found");
        }

        res.redirect("/manager/dashboard");
    });
}



module.exports = {
        showDashboard,
        showAddGame,
        addGame,
        showEditGame,
        editGame,
        deleteGame
}