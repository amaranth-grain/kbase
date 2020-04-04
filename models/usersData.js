let db = require('../db/db');

function addusers(name,about,url,dob,country,email,password) {
    query = `Insert into users (name,about,imageurl,dob,country,email,password) VALUES ('${name}','${about}','${url}','${dob}','${country}','${email}','${password}')`
     db.query(query);
}

function createCredentials(email,password){
    query = `Insert into users (email,password) VALUES ('${email}','${password}')`
    db.query(query);
}

function addProfile(name,about,dob,country,id){
    query = `update users set name = '${name}', about='${about}',dob='${dob}',country='${country}' where id = ${id};`
    db.query(query)
}

function addPicture(imageurl,id){
    query = `update users set imageurl = '${imageurl}' where id = ${id};`
    db.query(query)
}

function getId(email){
    query = `select id from users where email = '${email}';`
    db.query(query)
}

function getAllUsers() {
    return db.query('Select * from users');
}

function getUser(id) {
    query = `Select * from users where id = ${id}`
    return db.query(query);
}

function checkUser(email, pass) {
    return db.query("SELECT * FROM users WHERE email = '" + email + "' AND password = '" + pass + "'");
}

module.exports = {
    add : addusers,
    getAll : getAllUsers,
    getUser: getUser,
    addProfile:addProfile,
    createCredentials:createCredentials,
    addPicture:addPicture,
    getId:getId,
    check: checkUser
}