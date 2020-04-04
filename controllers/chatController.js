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
    }).catch(() => res.render('chat', {chatAssests: true, contacts: res.contacts, messages: [{"name": "Error: getting messages failed."}], convId: conservationId, sender: user_id}));

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
    }).catch(() => res.render('chat', {chatAssests: true, contacts: [{"name": "Error: getting contacts failed"}]})); 
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

    let promise = new Promise(function(resolve, reject){
        res.contacts.forEach(element => {
            mod.getlatest(element.conversation_id).then((data) => {
                if(data.rows[0].message.length > 15){
                    element.latestMessage = data.rows[0].message.substring(0, 12) + "..."; 
                } else {
                    element.latestMessage = data.rows[0].message;
                }
                let date = data.rows[0].timestamp;
                element.latestMessageDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
            }).catch(err => reject(err))
        });
        resolve();
    });

    promise.then(()=> next()).catch(() => res.render('chat', {chatAssests: true, contacts: [{"latestMessage": "Error: getting latest messages failed."}]})); 


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
        }).catch(() => res.render('chat', {chatAssests: true, contacts: res.contacts, messages: [{"message": "Error: getting conversation id failed."}]}));
    }
}

function newMessage(req,res,next) {
    let dbQuery = mod.createmessage(req.body.convId, req.body.sender, req.body.messageInput, Date.now());
    dbQuery
    .then((data) => {})
    .catch(() => res.render('chat', {chatAssests: true, contacts: res.contacts, messages: [{"message": "Error: getting sending message failed."}]})); 
    res.convId = req.body.convId;
    next();
}

module.exports = {
    getContacts: getContacts,
    getConvId: getConvId,
    loadConversation: loadConversation,
    newMessage: newMessage,
    getLatestMessage: getLatestMessage
}