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

function getContacts(id){
    return db.query('(select * from conversation left join people on people.id = conversation.second_person where first_person ='+id +' ) union all (select * from  conversation left join people on people.id = conversation.first_person where second_person = '+ id+')')

    
}

function getConversation(id,contactid){
    return db.query('select conversation_id from conversation where first_contact =' + id + ' and second_contact =' + contactid + ' or first_contact=' +contactid+ 'and second_contact=' + id);
}

function getMessages(id){
    return db.query('select message from message where conversation_id =' + id)
}

function addContact(id,addid){
    return db.query('INSERT INTO contacts (user_id,contact_id) VALUES (' + id + ',' + addid + '),(' + addid + ',' + id + ');')
}

function writeMessage(conversationid,senderid,datetime,message){
    return db.query('INSERT INTO message (conversation_id,sender,message,datetime) VALUES (' + conversationid + ', ' + senderid +','+ message +',' + datetime+');')
}

function createConversation(id,receiverid){
    return db.query('INSERT INTO public.conversation (first_contact,second_contact) VALUES (' + id + ','+receiverid +');')
}


module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople,
    getconvo: getConversation,
    getmessages: getMessages,
    getcontacts: getContacts,
    addcontact: addContact,
    writemessage: writeMessage,
    createconvo: createConversation
}