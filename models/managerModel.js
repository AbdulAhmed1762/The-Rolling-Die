const db = require("../database/database.js");


// Find manager by username

function findByUsername(username, callback) {
    
    const sql = "SELECT * FROM managers WHERE username = ?";


    db.get(sql, [username], (err,manager) => {
        callback(err,manager);
    });
}

module.exports = {
    findByUsername
}