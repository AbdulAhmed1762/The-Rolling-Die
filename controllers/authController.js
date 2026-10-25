const managerModel = require("../models/managerModel.js");
const bcrypt = require("bcrypt");

// Display login page
function showLogin(req, res) {
    res.render("login", {
        title: "Manager Login"
    });
}

// Handle manager login
function login(req, res) {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).render("login", {
            title: "Manager Login",
            error: "Username and password are required"
        });
    }

    managerModel.findByUsername(username, async (err, manager) => {

        if (err) {
            return res.status(500).send("Database error");
        }

        if (!manager) {
            return res.status(401).render("login", {
                title: "Manager Login",
                error: "Invalid username or password"
            });
        }

        try {
            const validPassword = await bcrypt.compare(
                password,
                manager.password_hash
            );

            if (!validPassword) {
                return res.status(401).render("login", {
                    title: "Manager Login",
                    error: "Invalid username or password"
                });
            }

            // Store manager information in session
            req.session.managerId = manager.id;

            req.session.save((err) => {
                if (err) {
                    return res.status(500).send("Session error");
                }

                res.redirect("/manager/dashboard");
            });

        } catch (err) {
            console.error("Login error:", err);
            res.status(500).send("Login error");
        }
    });
}

// Logout
function logout(req, res) {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).send("Logout failed");
        }

        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
}

module.exports = {
    showLogin,
    login,
    logout
};