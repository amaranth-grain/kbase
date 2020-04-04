let db = require('../db/db');

function addusers(name,about,url,dob,country,email,password) {
    query = `Insert into users (name,about,imageurl,dob,country,email,password) VALUES ('${name}','${about}','${url}','${dob}','${country}','${email}','${password}')`
     db.query(query);
}

function createUser(name,email,password){
    query = `Insert into users (name,email,password) VALUES ('${name},${email}','${password}')`
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

function getID(email){
    query = `select id from users where email = '${email}';`
    db.query(query)
}

function getAllusers() {
    return db.query('Select * from users');
}

function getusers(id) {
    query = `Select * from users where id = ${id}`
    return db.query(query);
}

function checkUser(email, pass) {
    return db.query("SELECT * FROM users WHERE email = '" + email + "' AND password = '" + pass + "'");
}

function checkEmail(email){
    query = `select count (*) from users where email = ${email}`
    return db.query(query)
}

function getNumOfPosts(user_id){
    query = `select count (*) from reply where user_id = ${user_id}`
    return db.query(query)
}
function getNumOfMessages(user_id){
    query = `select count (*) from conversation where first_user = ${user_id} or second_user = ${user_id}`
    return db.query(query)
}


module.exports = {
    add : addusers,
    createuser : createUser,
    getall : getAllusers,
    getusers: getusers,
    addprofile:addProfile,
    createcredentials:createCredentials,
    addpicture:addPicture,
    getId:getID,
    check: checkUser,
    checkemail: checkEmail,
    getnumposts:getNumOfPosts,
    getnummess:getNumOfMessages
}