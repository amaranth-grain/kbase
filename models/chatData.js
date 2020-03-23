let db = require('../db/db');

function addPeople(e) {
     db.query("Insert into people (name,about,imageurl,dob,country) VALUES ('" + e.name +"','"+ e.about + "','"+ e.url +"','"+ e.dob + "','"+ e.country + "')");
}

function getAllPeople() {
    return db.query('Select * from people');
}

function getPeople(id) {
    return db.query('Select * from people where id = ' + id);
}

//gets a list of people that a user has conversations with 
function getContacts(id){
    return db.query('(select * from conversation left join people on people.id = conversation.second_person where first_person ='+id +' ) union all (select * from  conversation left join people on people.id = conversation.first_person where second_person = '+ id+')')

 
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
    return db.query('select conversation_id from conversation where first_contact =' + id + ' and second_contact =' + contactid + ' or first_contact=' +contactid+ 'and second_contact=' + id);
}


//gets messages for the specified conversation id 
function getMessages(conversation_id){
    return db.query('select * from message where conversation_id =' + conversation_id)
}

//inserts a message into the message table 
function createMessage(conversationid,senderid,datetime,message){
    return db.query('INSERT INTO message (conversation_id,sender,message,datetime) VALUES (' + conversationid + ', ' + senderid +','+ message +',' + datetime+');')
}

//creates a conversation between the two users 
function createConversation(id,receiverid){
    return db.query('INSERT INTO conversation (first_contact,second_contact) VALUES (' + id + ','+receiverid +');')
}


module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople,
    getconvo: getConversation,
    getmessages: getMessages,
    getcontacts: getContacts,
    addcontact: addContact,
    createmessage: createMessage,
    createconvo: createConversation,

}