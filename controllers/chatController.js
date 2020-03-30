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
    var conservationId = res.locals.convId;
    
    var queryConv = mod.getmessages(conservationId);

    queryConv
    .then((data) => {
        newMessages = data.rows;
        newMessages.forEach(element => {
            let date = new Date(Date.parse(element.timestamp + "+0000"));
            element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
            element.time = date.toLocaleString('default', { hour: 'numeric', hour12: true, minute: 'numeric'});
        });
        res.render('chat', {chatAssests: true, contacts: res.locals.contacts, messages: newMessages, convId: conservationId, sender: user_id});
    }).catch(err => console.log(err));  

}

function getContacts(req,res,next) {
    // let user_id = req.body.user_id;
    let user_id = 1;
    let dbQuery = mod.getcontacts(user_id);
    dbQuery.then((data) => {
        res.locals.contacts = data.rows;
        next();
    }).catch(err => console.log(err));  
}

function getConvId(req,res,next) {
    if(req.body.convId != undefined){
        res.locals.convId = req.body.convId;
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

        var contact_id = res.locals.contacts[0].id;

        var queryConv = mod.getconvo(user_id, contact_id);
        queryConv
        .then((data) => {
            res.locals.convId = data.rows[0]["conversation_id"];
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
}