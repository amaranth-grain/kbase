let db = require('../db/db');

//creates a discussion row in the table, sample datime 2017-03-04 06:08:00
function createDiscussion(id,details,datetime,tag){
    query = `insert into discussion (person_id,details,datetime,tag) values (${id},${details},${datetime}, ${tag});`
    return db.query(query)
}

function createReply(person_id,discussion_id,reply_details,reply_time){
    query = `insert into reply (person_id,discussion_id,reply_details,reply_time) values (${person_id},${discussion_id},${reply_details},${reply_time});`
    return db.query(query)
}

//gets the replies of a discussion based on the discussion id
function getReplies(discussion_id){
    query = `select * from reply where discussion_id = ${discussion_id} order by reply_time;`
    return db.query(query)
}

function getNumOfReplies(discussion_id){
    query = `SELECT count(*) from reply where discussion_id = ${discussion_id};`
    return db.query(query)
}

function getSpecificDateReply(date){
    query = `select * from reply where DATE(reply_time) = '${date}';`
    return db.query(query)
}
//sample date 2017-03-04
function getSpecificDateDiscussion(date){
    query = `select * from discussion where DATE(datetime) = '${date}';`
    return db.query(query)
}

//will be used for pagination, used to select what shows up on each page 
function selectTopicRange(start_row,num_of_rows){
    query = `select * from discussion order by datetime desc offset ${start_row} limit ${num_of_rows} `
    return db.query(query)
}

function selectTopicRangeFilter(start_row,num_of_rows,filter){
    query = `select * from discussion order by datetime desc offset ${start_row} limit ${num_of_rows} `
    return db.query(query)
}


function filterByTag(tag){
    query = `select * from discussion where tag = ${tag}`
    return db.query(query)
}

function incrementLikes(reply_id){
    query = `update reply set num_of_likes = num_of_likes+1 where reply_id = ${reply_id}`
    return db.query(query)
}





module.exports = {
    creatediscussion:createDiscussion,
    createreply: createReply,
    getreplies: getReplies,
    filterbytag:filterByTag,
    selecttopicrange:selectTopicRange,
    selecttopicrangefilter:selectTopicRangeFilter,
    getspecificdatediscussion:getSpecificDateDiscussion,
    getspecificdatereply:getSpecificDateReply,
    incrementlikes:incrementLikes
}