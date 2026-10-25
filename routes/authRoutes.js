const exporess = require("express");
const router = exporess.Router();

const authController = require("../controllers/authController.js");


router.get("/login", authController.showLogin);
router.post("/login", authController.login);
router.post("/logout", authController.logout);


module.exports = router;

