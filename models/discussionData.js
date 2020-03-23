let db = require('../db/db');

//creates a discussion row in the table, sample datime 2017-03-04 06:08:00
function createDiscussion(id,details,datetime,tag){
    return db.query('insert into discussion (person_id,details,datetime,tag) values (' +id+ ',' +details + ','+ datetime+', '+tag+');')
}

function createReply(person_id,discussion_id,reply_details,reply_time){
    return db.query('insert into reply (person_id,discussion_id,reply_details,reply_time) values ('+person_id+','+discussion_id+','+reply_details+',' +reply_time+');')
}

//gets the replies of a discussion based on the discussion id
function getReplies(discussion_id){
    return db.query('select reply_details from reply where discussion_id = '+discussion_id+' order by reply_time;')
}

module.exports = {
    creatediscussion:createDiscussion,
    createreply: createReply,
    getreplies: getReplies
}