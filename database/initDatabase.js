const fs = require ("fs");
const path = require ("path");
const db = require("./database");


// Reading the SQL schema
const schema = fs.readFileSync (
    path.join(__dirname, "schema.sql"),
    "utf8"
);


// Create the database tables

db.exec(schema, (err) => {

    if(err) {
        console.error("Error creating tables:", err.message);
    } else {
        console.log("Games table created successfully");
    }

    db.close();
});

