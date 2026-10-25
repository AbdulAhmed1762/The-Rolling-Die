
const db = require("./database");

const sql = 'SELECT * FROM games';


db.all(sql,(err,rows) => {

    if(err) {
        console.error("Database error:" , err.message);
    } else {
        console.log("Retrieved rows:", rows);
    }

    db.close();

});