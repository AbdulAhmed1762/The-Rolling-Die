const fs = require ("fs");
const path = require ("path");
const db = require("./database");


const seed = fs.readFileSync (
    path.join(__dirname, "seed.sql"),
    "utf8"
);

// inserting sample inventory
db.exec(seed, (err) => {

    if(err) {
        console.error("Error inserting:", err.message);
    } else {
        console.log("Inserted successfully");
    }

    db.close();

});
