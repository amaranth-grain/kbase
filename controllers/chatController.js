let mod = require('../models/chatData');

function loadConversation(req,res,next) {
    // let user_id = req.body.user_id;
    var user_id = 1;
    var contact_id = req.body.contactId;
    var newContacts = [];
    var newMessages = [];
    var conversationId = null;
    var queryContacts = mod.getcontacts(user_id);
    queryContacts.then((data) => {
        newContacts = data.rows;
    }).catch(err => console.log(err));  

    var queryConv = mod.getconvo(user_id, contact_id);
    queryConv
    .then((data) => {
        conversationId = (data.rows[0]["conversation_id"]);
        mod.getmessages(data.rows[0]["conversation_id"])
        .then((data) => {
            newMessages = data.rows;
            newMessages.forEach(element => {
                let date = element.date;
                element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
                element.time = date.toLocaleString('default', { hour: 'numeric', hour12: true, minute: 'numeric'});
            });
            res.render('chat', {chatAssests: true, contact: newContacts, message: newMessages, convId: conversationId, sender: user_id});
        })
    }).catch(err => console.log(err));  

}

function loadChat(req,res,next) {
    // let user_id = req.body.user_id;
    let user_id = 1;
    let dbQuery = mod.getcontacts(user_id);
    dbQuery.then((data) => {
        res.render('chat', {chatAssests: true, contact: data.rows, });
    }).catch(err => console.log(err));  
}

function newMessage(req,res,next) {
    console.log(req.body)
    res.end();
    let dbQuery = mod.createmessage(req.body.convId, req.body.sender, Date.now(), req.body.messageInput);
    dbQuery.then((data) => {
        res.render('chat', {chatAssests: true, contact: data.rows});
    }).catch(err => console.log(err));  
}

module.exports = {
    loadChat: loadChat,
    loadConversation: loadConversation,
    newMessage: newMessage,
}