const express = require("express");
const router = express.Router();


const gameController = require("../controllers/gameController.js");

// Public route to display all games
router.get("/inventory", gameController.showGames);

module.exports = router;

