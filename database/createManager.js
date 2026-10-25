require("dotenv").config();
const db = require("./database.js");
const bcrypt = require("bcrypt");


// Manager account details
const username = process.env.MANAGER_USERNAME;
const password = process.env.MANAGER_PASSWORD;


async function createManager() {

    if(!username || !password) {
        console.error("Manager credenetials are missing from .env");
        db.close();
        return;
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert manager into SQLite
        const sql = ` INSERT INTO managers (username, password_hash) 
        VALUES (?,?) `;

        db.run(sql, [username, hashedPassword], function(err) {

            if (err) {
                console.error("Error creating manager:", err.message);
            } else {
                console.log("Manager created successfully");
                console.log("Manager ID:", this.lastID);
            }

            db.close();

        });

} catch (err) {
    console.error("Error hashing password: ", err.message);
    db.close();
    }
}

createManager();