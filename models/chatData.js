let db = require('../db/db');
//gets a list of users that a user has conversations with 
function getContacts(id){
    return db.query('(select * from conversation left join users on users.id = conversation.second_user where first_user ='+id +' ) union all (select * from  conversation left join users on users.id = conversation.first_user where second_user = '+ id+')')

 
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
    return db.query('select conversation_id from conversation where first_user =' + id + ' and second_user =' + contactid + ' or first_user=' +contactid+ 'and second_user=' + id);
}


//gets messages for the specified conversation id 
function getMessages(conversation_id){
    return db.query('select * from message left join users on id = message.sender where conversation_id =' + conversation_id + ' order by date asc,time asc')
}

function getLatestMessage(conversation_id){
    return db.query('select * from message left join users on id = message.sender where conversation_id = ' + conversation_id + ' order by date desc,time desc limit 1')
}


//inserts a message into the message table 
function createMessage(conversationid,senderid,message,date,time){
    return db.query("INSERT INTO message (conversation_id,sender,message,date,time) VALUES (" + conversationid + ", " + senderid +",'" + message +"','" + date+"','" +time+"');")
}

//creates a conversation between the two users 
function createConversation(id,receiverid){
    return db.query('INSERT INTO conversation (first_contact,second_contact) VALUES (' + id + ','+receiverid +');')
}


module.exports = {
    getconvo: getConversation,
    getmessages: getMessages,
    getcontacts: getContacts,
    createmessage: createMessage,
    createconvo: createConversation,
    getlatest: getLatestMessage
}