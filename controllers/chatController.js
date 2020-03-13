let mod = require('../models/peopleData');


function loadChat(req,res,next) {
    res.render('chat', {chatAssests: true});
}

module.exports = {
    loadChat: loadChat
}