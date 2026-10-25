const db = require("../database/database.js");


const sql = "SELECT * From games";


function getAllGames(callback) {

    db.all(sql,(err, rows) => {
        callback(err,rows);
    });


}

module.exports =  {
    getAllGames
}
