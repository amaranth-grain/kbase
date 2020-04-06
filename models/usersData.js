let db = require('../db/db');

function addUsers(name,about,imageurl,dob,country,email,password) {
    query = `Insert into users (name,about,imageurl,dob,country,email,password) VALUES ('${name}','${about}', '${imageurl}', '${dob}', '${country}','${email}','${password}')`
    db.query(query);
}
/**** FOR SIGN UP ****/
function createUser(user){
    let sql = `Insert into users (name, lastname, email, password) values ('${user.fname}','${user.lname}','${user.email}','${user.password}')`;
    db.query(sql);
    return 1;
}

function getId(email){
    let query = `select id from users where email = '${email}';`
    return db.query(query);
}

function updateProfile(id, user){
    query = `update users set imageurl='${user.imgUrl}', about='${user.about}',dob='${user.dob}',country='${user.country}' where id = ${id};`
    db.query(query);
}
/**** FOR SIGN UP ****/

function createCredentials(email,password){
    query = `Insert into users (email,password) VALUES ('${email}','${password}')`
    db.query(query);
}

function addPicture(imageurl,id){
    query = `update users set imageurl = '${imageurl}' where id = ${id};`
    db.query(query);
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

function checkEmail(email){
    let query = `select count (*) from users where email = '${email}';`;
    return db.query(query)
}

function getNumOfPosts(user_id){
    query = `select count (*) from reply where user_id = '${user_id}'`
    return db.query(query)
}
function getNumOfMessages(user_id){
    query = `select count (*) from conversation where first_user = ${user_id} or second_user = ${user_id}`
    return db.query(query)
}

function getNumOfLikes(user_id){
    query = `select sum(num_of_likes) from reply where user_id = ${user_id}`
    return db.query(query)
}

module.exports = {
    add : addUsers,
    getAll : getAllUsers,
    getUser: getUser,
    updateProfile: updateProfile,
    createCredentials:createCredentials,
    addPicture:addPicture,
    getId:getId,
    check: checkUser,
    createUser : createUser,
    checkEmail: checkEmail,
    getNumOfPosts:getNumOfPosts,
    getNumOfMessages:getNumOfMessages,
    getNumOfLikes:getNumOfLikes
}