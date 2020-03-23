let mod = require('../models/peopleData');

function loadConversation(req,res,next) {
    let user_id = req.body.user_id;
    let contact_id = req.body.contact_id;
    let dbQuery = mod.getconvo(user_id, contact_id);
    dbQuery.then((data) => {
        let messages = mod.getmessages(data.rows[0]["conversation_id"]);
        messages.then((data) => {
            res.json({"messages": data.rows});
        }).catch(err => console.log(err)); 

    //TO DO CHANGE TO REDIRECT!
    }).catch(err => console.log(err));  
}

function loadChat(req,res,next) {
    // let user_id = req.body.user_id;
    let user_id = 1;
    let dbQuery = mod.getcontacts(user_id);
    dbQuery.then((data) => {
        console.log(data.rows)
        res.render('chat', {chatAssests: true, contacts: data.rows, });
    }).catch(err => console.log(err));  
}

module.exports = {
    loadChat: loadChat,
    loadConversation: loadConversation,
}