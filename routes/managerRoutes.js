const express = require("express");
const router = express.Router();

const managerController = require("../controllers/managerController.js");
const { requireLogin } = require("../middleware/authMiddleware.js");

// Protected manager dashboard
router.get("/manager/dashboard", requireLogin, managerController.showDashboard);

module.exports = router;