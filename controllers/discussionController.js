let mod = require('../models/discussionData');
let mod2 = require('../models/usersData');
var offset = 0;
var pagelimit = 5;

function incrementOffset(req,res,next){
    
    res.backVisible = true;
    var queryConv = mod.getNumberOfDiscussions();
    
    queryConv
    .then((data) => {
        
        maxRows = parseInt(data.rows[0].count);
        offset +=pagelimit;
        if(offset+pagelimit>maxRows){
            res.nextVisible = false;
        } else {
            res.nextVisible = true;
        }
        
        next();
    }).catch((err) => console.log(err));
    
}

function resetOffset(req,res,next){
    offset = 0;
    res.backVisible = false;
    res.nextVisible = true;
    next();
}

function decrementOffset(req,res,next){
    offset -= pagelimit;
    if(offset-pagelimit < 0){
        res.backVisible = false;
    } else {
        res.backVisible = true;
    }
    res.nextVisible = true;
    next()
}
function getLatestDiscussion(req,res,next) {
    //var offset = 0;
    var limit = 5;
    var queryConv = mod.selectTopicRange(offset, limit);

    queryConv
    .then((data) => {
        res.discussions = data.rows;
        next();
    }).catch((err) => console.log(err));
}

function getUserImages(req,res,next) {
    var discussions = res.discussions;
    var promises = discussions.map(element => {
        return new Promise((resolve, reject) => {
            mod2.getUser(element.user_id).then((data) => {
                element.imageurl = data.rows[0].imageurl;
            }).then(()=>resolve()).catch(err => reject(err))
        });
    });

    Promise.all(promises)
    .then(() => {
        res.discussions = discussions;
        next();
    }).catch((err) => console.log(err));
}

function formatDatetime(req,res,next) {
    var discussions = res.discussions;
    
    let promise = new Promise(function(resolve, reject){
        discussions.forEach(element => {
            let date = new Date(Date.parse(element.datetime + "+0000"));
            element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
        });
        resolve();
    });

    promise
    .then(()=> {
        res.discussions = discussions;
        next();
    })
    .catch((err) => console.log(err));

}

function getNumOfReplies(req,res,next) {
    var discussions = res.discussions;
    var promises = discussions.map(element => {
        return new Promise((resolve, reject) => {
            mod.getNumOfReplies(element.discussion_id).then((data) => {
                element.numReplies = parseInt(data.rows[0].count);
            }).then(()=>resolve()).catch(err => reject(err))
        });
    });

    Promise.all(promises)
    .then(() => {
        res.discussions = discussions;
        next();
    }).catch((err) => console.log(err));
}

function getReplies(req,res,next) {
    var discussions = res.discussions;
    var promises = discussions.map(element => {
        return new Promise((resolve, reject) => {
            mod.getreplies(element.discussion_id).then((data) => {
                element.reply = data.rows;
            }).then(()=>resolve()).catch(err => reject(err))
        });
    });

    Promise.all(promises)
    .then(() => {
        discussions.forEach((element) => {
            element.reply.forEach((reply) => {
                let date = new Date(Date.parse(reply.reply_time + "+0000"));
                reply.reply_time = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
            })
        })
        res.discussions = discussions;
        next();
    }).catch((err) => console.log(err));
}


function loadLatestDiscussions(req,res,next) {
    res.render('home', {profile: [res.profile], discussion: res.discussions,backVisible:res.backVisible,nextVisible:res.nextVisible});
}

function newReply(req,res,next) {
    res.redirect("/home");
}

module.exports = {
    resetOffset:resetOffset,
    incrementOffset:incrementOffset,
    decrementOffset:decrementOffset,
    getLatestDiscussion: getLatestDiscussion,
    getUserImages: getUserImages,
    formatDatetime: formatDatetime,
    getNumOfReplies: getNumOfReplies,
    loadLatestDiscussions: loadLatestDiscussions,
    getReplies: getReplies,
    newReply: newReply
}