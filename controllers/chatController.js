let mod = require('../models/chatData');

function loadConversation(req,res,next) {
    // let user_id = req.body.user_id;
    // REPLACE WITH SESSIONS... 
    //
    //
    //
    //
    //
    //
    var user_id = 1;
    var conservationId = res.convId;
    
    var queryConv = mod.getmessages(conservationId);

    queryConv
    .then((data) => {
        newMessages = data.rows;
        newMessages.forEach(element => {
            let date = new Date(Date.parse(element.timestamp + "+0000"));
            element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
            element.time = date.toLocaleString('default', { hour: 'numeric', hour12: true, minute: 'numeric'});
        });
        res.render('chat', {chatAssests: true, contacts: res.contacts, messages: newMessages, convId: conservationId, sender: user_id});
    }).catch(err => console.log(err));  

}

function getContacts(req,res,next) {
    // let user_id = req.body.user_id;
    // REPLACE WITH SESSIONS... 
    //
    //
    //
    //
    //
    //
    let user_id = 1;
    let dbQuery = mod.getcontacts(user_id);
    dbQuery.then((data) => {
        res.contacts = data.rows;
        next();
    }).catch(err => console.log(err));  
}

function getLatestMessage(req,res,next) {
    // let user_id = req.body.user_id;
    // REPLACE WITH SESSIONS... 
    //
    //
    //
    //
    //
    //
    let user_id = 1;
    let contacts = res.contacts;

    contacts.forEach(element => {
        mod.getlatest(element.conversation_id).then((data) => {
            if(data.rows[0].message.length > 20){
                element.latestMessage = data.rows[0].message.substring(0, 17) + "..."; 
            } else {
                element.latestMessage = data.rows[0].message;
            }
            let date = data.rows[0].timestamp;
            element.latestMessageDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
        }).catch(err => console.log(err));  
    });
    
    next();
}

function getConvId(req,res,next) {
    if(req.body.convId != undefined){
        res.convId = req.body.convId;
        next();
    } else {
        // let user_id = req.body.user_id;
        // REPLACE WITH SESSIONS... 
        //
        //
        //
        //
        //
        //
        var user_id = 1;

        var contact_id = res.contacts[0].id;

        var queryConv = mod.getconvo(user_id, contact_id);
        queryConv
        .then((data) => {
            res.convId = data.rows[0]["conversation_id"];
            next();
        }).catch(err => console.log(err));  
    }
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
    getContacts: getContacts,
    getConvId: getConvId,
    loadConversation: loadConversation,
    newMessage: newMessage,
    getLatestMessage: getLatestMessage
}