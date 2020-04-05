let mod = require('../models/discussionData');

function getLatestDiscussion(req,res,next) {
    var offset = 0;
    var limit = 5;
    
    var queryConv = mod.selectTopicRange(offset, limit);

    queryConv
    .then((data) => {
        console.log(data)
        res.render('home', {profile: [res.profile], discussion: data.rows});
    }).catch((err) => console.log(err));
    // }).catch(() => res.render('chat', {chatAssests: true, contacts: res.contacts, messages: [{"name": "Error: getting messages failed."}], convId: conservationId, sender: user_id}));

}


module.exports = {
    getLatestDiscussion: getLatestDiscussion,
}