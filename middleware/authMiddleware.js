// Checking to see if manager is logged in

function requireLogin(req, res, next) {

    if(!req.session.managerId) {
        return res.redirect("/login");
    }

    next();
}

module.exports = {
    requireLogin
};

