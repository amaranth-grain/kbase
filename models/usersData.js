let db = require('../db/db');

function addusers(e) {
    query = `Insert into users (name,about,imageurl,dob,country,email,password) VALUES ('${e.name}','${e.about}','${e.url}','${e.dob}','${e.country},${e.email},${e.password}')`
     db.query(query);
}

function getAllusers() {
    return db.query('Select * from users');
}

function getusers(id) {
    query = `Select * from users where id = ${id}`
    return db.query(query);
}


module.exports = {
    add : addusers,
    getall : getAllusers,
    getusers: getusers,
}