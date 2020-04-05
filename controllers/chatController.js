let mod = require('../models/chatData');

function loadConversation(req,res,next) {
    var user_id = req.session.userId;
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
    var user_id = req.session.userId;
    let dbQuery = mod.getcontacts(user_id);
    dbQuery.then((data) => {
        res.contacts = data.rows;
        next();
    }).catch(() => res.render('chat', {chatAssests: true, contacts: [{"name": "Error: getting contacts failed"}]})); 
}

function getLatestMessage(req,res,next) {
    var contacts = res.contacts;
    var promises = contacts.map(element => {
        return new Promise((resolve, reject) => {
            mod.getlatest(element.conversation_id).then((data) => {
                if(data.rows[0].message.length > 15){
                    element.latestMessage = data.rows[0].message.substring(0, 12) + "..."; 
                } else {
                    element.latestMessage = data.rows[0].message;
                }
                let date = data.rows[0].timestamp;
                element.latestMessageDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
            }).then(()=>resolve()).catch(err => reject(err))
        });
    });

    Promise.all(promises)
    .then(() => {
        res.contacts = contacts;
        next();
    }).catch(() => res.render('chat', {chatAssests: true, contacts: [{"latestMessage": "Error: getting latest messages failed."}]})); 

}

function getConvId(req,res,next) {
    if(req.session.convId != undefined){
        req.body.convId = req.session.convId;
        delete req.session.convId;
    }

    if(req.body.convId != undefined){
        res.convId = req.body.convId;
        next();
    } else {
        var user_id = req.session.userId;

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
    req.session.convId = req.body.convId;
    res.redirect("/chat")
}

module.exports = {
    getContacts: getContacts,
    getConvId: getConvId,
    loadConversation: loadConversation,
    newMessage: newMessage,
    getLatestMessage: getLatestMessage
}