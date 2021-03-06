let db = require('../db/db');
//gets a list of users that a user has conversations with 
function getContacts(id){
    query = `(SELECT * from conversation left join users on users.id = conversation.second_user where first_user =${id}) union all (select * from  conversation left join users on users.id = conversation.first_user where second_user = ${id})`
    return db.query(query)

 
    /* same usage for a controller, need to loop through the data rows 
    exports.getContacts = function(req,res,next) {
        let id = req.params.id;
        let contacts = mod.getcontacts(id);
        contacts.then((data) => {
            let rows = data.rows 
            for (let  i = 0;  i <  Data.length;  i++)  {  
                console.log(rows[0])
            }  
        })
}

    */
}

//get an individual conversation based on id and the other users id 
function getConversation(id,contactid){
    query = `SELECT conversation_id from conversation where first_user = ${id} and second_user = ${contactid} or first_user= ${contactid} and second_user=${id}`
    return db.query(query);
}


//gets messages for the specified conversation id 
function getMessages(conversation_id){
    query = `SELECT * from message left join users on id = message.sender where conversation_id = ${ conversation_id} order by timestamp asc`
    return db.query(query)
}

function getLatestMessage(conversation_id){
    query = `SELECT * from message left join users on id = message.sender where conversation_id = ${ conversation_id} order by timestamp desc limit 1`
    return db.query(query)
}

// sample sql input INSERT INTO message (conversation_id,sender,message,timestamp) VALUES (1,1 ,'testtest','2017-03-14 07:10:00');
//inserts a message into the message table 
function createMessage(conversationid,senderid,message,timestamp){
    query = `INSERT INTO message (conversation_id,sender,message,timestamp) VALUES (${conversationid}, ${senderid}, '${message}', to_timestamp(${timestamp}/ 1000.0));`
    return db.query(query)
}

//creates a conversation between the two users 
function createConversation(id,receiverid,subject){
    query = `insert into conversation (first_user, second_user, subject) VALUES(${id}, ${receiverid}, '${subject}');`
    db.query(query)
    return getConversation(id,receiverid)
}


module.exports = {
    getconvo: getConversation,
    getmessages: getMessages,
    getcontacts: getContacts,
    createmessage: createMessage,
    createconvo: createConversation,
    getlatest: getLatestMessage
}