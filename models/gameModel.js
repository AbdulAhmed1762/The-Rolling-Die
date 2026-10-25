
const db = require("../database/database.js");

const sql = "SELECT * FROM games";

// Retrieve all games
function getAllGames(callback) {

    db.all(sql, (err, rows) => {
        callback(err, rows);
    });
}

// Add a new game to the database
function createGame(game, callback) {

    const sql = `
        INSERT INTO games (title, category, description, price, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [
        game.title,
        game.category,
        game.description,
        game.price,
        game.stock
    ], function(err) {

        callback(err, this.lastID);

    });
}


// Retrieving a single game by ID
function getGameById(id, callback) {
    const sql = "SELECT * FROM games WHERE id = ?";

    db.get(sql, [id], (err, game) => {
        callback(err,game);

    });
}

// Update an existing game
function updateGame(id, game, callback) {

    const sql = ` UPDATE games
                  SET title = ?, category = ?, description = ?, price = ? , stock = ?
                  WHERE id = ? `;

    db.run(sql, [
        game.title,
        game.category,
        game.description,
        game.price,
        game.stock,
        id
    ], function(err) {
        callback(err, this.changes);
    });

}

// Delete a game from the database
function deleteGame(id, callback) {

    const sql = "DELETE FROM games WHERE id = ?";

    db.run(sql, [id], function(err) {
        callback(err, this.changes);

    });

}

module.exports = {
    getAllGames,
    createGame,
    getGameById,
    updateGame,
    deleteGame
};
