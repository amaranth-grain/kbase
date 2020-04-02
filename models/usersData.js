let db = require('../db/db');

function addusers(name,about,url,dob,country,email,password) {
    query = `Insert into users (name,about,imageurl,dob,country,email,password) VALUES ('${name}','${about}','${url}','${dob}','${country},${email},${password}')`
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