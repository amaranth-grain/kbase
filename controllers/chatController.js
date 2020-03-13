let mod = require('../models/peopleData');


function loadChat(req,res,next) {
    // let user_id = req.body.user_id;
    
    let dbQuery = mod.getcontacts(1);
    dbQuery.then((data) => {
        res.render('chat', {chatAssests: true, contacts: data.rows});
    }).catch(err => console.log(err));  
}

module.exports = {
    loadChat: loadChat
}