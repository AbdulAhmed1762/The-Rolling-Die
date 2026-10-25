const express = require("express");
const router = express.Router();

const managerController = require("../controllers/managerController.js");
const { requireLogin } = require("../middleware/authMiddleware.js");

// Display add game form
router.get("/manager/games/add", requireLogin, managerController.showAddGame);

// Add game to database
router.post("/manager/games/add", requireLogin, managerController.addGame);

// Protected manager dashboard
router.get("/manager/dashboard", requireLogin, managerController.showDashboard);

// Display edit game form
router.get("/manager/games/edit/:id", requireLogin, managerController.showEditGame);

// Update existing game
router.post("/manager/games/edit/:id", requireLogin, managerController.editGame);

// Delete a game
router.post("/manager/games/delete/:id", requireLogin, managerController.deleteGame);


module.exports = router;