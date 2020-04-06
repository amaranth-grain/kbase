let db = require('../db/db');

//creates a discussion row in the table, sample datime 2017-03-04 06:08:00
function createDiscussion(id,details,datetime,tag,subject){
    query = `insert into discussion (user_id,details,datetime,tag,subject) values (${id},${details},${datetime}, ${tag},${subject});`
    return db.query(query)
}

function createReply(person_id,discussion_id,reply_details,reply_time){
    query = `insert into reply (user_id,discussion_id,reply_details,reply_time) values (${person_id},${discussion_id},${reply_details},${reply_time});`
    return db.query(query)
}

//gets the replies of a discussion based on the discussion id
function getReplies(discussion_id){
    query = `select * from reply where discussion_id = ${discussion_id} order by reply_time;`
    return db.query(query)
}

function searchForSubject(subject){
    query = `select * from discussion where subject = ${subject}`
    return db.query(query)
}
function getNumOfReplies(discussion_id){
    query = `SELECT count(*) from reply where discussion_id = ${discussion_id};`
    return db.query(query)
}

function getDiscussion(discussion_id){
    query = `select * from discussion where discussion_id = ${discussion_id}`
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
//for example if you wanted row 5 to 10 do offset 5 limit 5
function selectTopicRange(start_row,num_of_rows){
    query = `select * from discussion order by datetime desc offset ${start_row} limit ${num_of_rows} `
    return db.query(query)
}

function selectTopicRangeFilter(start_row,num_of_rows,filter){
    query = `select * from discussion where tag = ${filter} order by datetime desc offset ${start_row} limit ${num_of_rows} `
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
    selectTopicRange:selectTopicRange,
    selectTopicRangeFilter:selectTopicRangeFilter,
    getSpecificDateDiscussion:getSpecificDateDiscussion,
    getSpecificDateReply:getSpecificDateReply,
    incrementLikes:incrementLikes,
    getNumOfReplies:getNumOfReplies,
    getDiscussion:getDiscussion,
    searchForSubject:searchForSubject
}