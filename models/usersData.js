let db = require('../db/db');

function addusers(e) {
     db.query("Insert into users (name,about,imageurl,dob,country) VALUES ('" + e.name +"','"+ e.about + "','"+ e.url +"','"+ e.dob + "','"+ e.country + "')");
}

function getAllusers() {
    return db.query('Select * from users');
}

function getusers(id) {
    return db.query('Select * from users where id = ' + id);
}


module.exports = {
    add : addusers,
    getall : getAllusers,
    getusers: getusers,
}