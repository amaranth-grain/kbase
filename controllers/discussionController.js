let mod = require('../models/discussionData');
let mod2 = require('../models/usersData');
var pagelimit = 5;
function incrementOffset(req,res,next){
    
    res.backVisible = true;
    var queryConv = mod.getNumberOfDiscussions();
    
    queryConv
    .then((data) => {
        
        maxRows = parseInt(data.rows[0].count);
        req.session.offset +=pagelimit;
        if(req.session.offset+pagelimit>maxRows){
            res.nextVisible = false;
        } else {
            res.nextVisible = true;
        }
        
        next();
    }).catch(err => {
        console.log("Error: Problem with incrementing the offset for pagination (all posts). ", err);
    });
    
}

function incrementOffsetForSearch(req,res,next){
    
    res.backVisibleFiltered = true;
    var queryConv =  mod.getNumFilteredDiscussions(req.session.filter)
    queryConv
    .then((data) => {
        maxRows = data.rows[0].count;
        req.session.offset += pagelimit
        if(req.session.offset+pagelimit>maxRows){
            res.nextVisibleFiltered= false;
        } else {
            res.nextVisibleFiltered = true;
        }
        next();
    }).catch(err => {
        console.log("Error: Problem with incrementing the offset for pagination (search by topic). ", err);
    });
    
}

function resetOffset(req,res,next){
    req.session.offset = 0;
    res.backVisible = false;
    var queryConv = mod.getNumberOfDiscussions();
    
    queryConv
    .then((data) => {
        
        maxRows = parseInt(data.rows[0].count);
        if(req.session.offset+pagelimit>maxRows){
            res.nextVisible = false;
        } else {
            res.nextVisible = true;
        }
        
        next();
    }).catch(err => {
        console.log("Error: Problem with resetting offset for pagination. ", err);
    });
}

function decrementOffset(req,res,next){
    req.session.offset -= pagelimit;
    if(req.session.offset-pagelimit < 0){
        res.backVisible = false;
        req.session.offset = 0;
    } else {
        res.backVisible = true;
    }
    res.nextVisible = true;
    next()
}


function decrementOffsetForSearch(req,res,next){
    req.session.offset -= pagelimit;
    if(req.session.offset-pagelimit < 0){
        res.prevVisibleFiltered = false;
        req.session.offset = 0;
    } else {
        res.backVisibleFiltered = true;
    }
    res.nextVisibleFiltered = true;
    next();
}

function getLatestDiscussion(req,res,next) {
    var limit = 5;
    var queryConv = mod.selectTopicRange(req.session.offset, limit);

    queryConv
    .then((data) => {
        res.discussions = data.rows;
        next();
    }).catch(err => {
        console.log("Error: Problem with getting the latest discussion. ", err);
    });
}

function getLatestTopic(req,res,next) {
    var limit = 5;
    var queryConv = mod.selectTopicRangeFilter(req.session.offset, limit, req.session.filter);
    queryConv
    .then((data) => {
        res.discussions = data.rows;
        next();
    }).catch(err => {
        console.log("Error: Problem with getting the latest topic. ", err);
    });
}


function resetOffsetForSearch(req,res,next){
    req.session.filter = res.topic
    req.session.offset = 0;
    res.backVisibleFiltered = false;
    var queryConv =  mod.getNumFilteredDiscussions(req.session.filter)
    queryConv
    .then((data) => {
        maxRows = data.rows[0].count;
        if(req.session.offset+pagelimit>maxRows){
            res.nextVisibleFiltered= false;
        } else {
            res.nextVisibleFiltered = true;
        }
        next();
    }).catch(err => {
        console.log("Error: Problem with resetting the offset for search by topic. ", err);
    });
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
    }).catch(err => {
        console.log("Error: Problem with getting user images for discussion posts. ", err);
    });
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
    .catch(err => {
        console.log("Error: Problem with formatting datetime from discussion post. ", err);
    });

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
    }).catch(err => {
        console.log("Error: Problem with getting the number of replies in discussion thread. ", err);
    });
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
        //console.log(element.reply)
        res.discussions = discussions;
        next();
    }).catch(err => {
        console.log("Error: Problem with getting the replies in discussion thread. ", err);
    });
}


function loadLatestDiscussions(req,res,next) {
    res.render('home', {profile: [res.profile], discussion: res.discussions,backVisible:res.backVisible,nextVisible:res.nextVisible,nextVisibleFiltered:res.nextVisibleFiltered,backVisibleFiltered:res.backVisibleFiltered});
}

function newReply(req,res,next) {
    let dbQuery = mod.createreply(req.session.userId, req.body.discId, req.body.replyInput, Date.now()).catch((err) => console.log(err));
    res.redirect('back');
}

const discuss = (req, res) => {
    let id = req.session.userId;
    let detail = req.body.detail;
    let date = Date.now();
    let tag = req.body.tag.toLowerCase();
    let subject = req.body.subject;
    mod.creatediscussion(id, detail, date, tag, subject).catch(err => {
        console.log("Error: Problem with creating new discussion post. ", err);
    }).catch((err) => console.log(err));
    res.redirect("/home");
}

module.exports = {
    resetOffset:resetOffset,
    resetOffsetForSearch:resetOffsetForSearch,
    incrementOffset:incrementOffset,
    incrementOffsetForSearch:incrementOffsetForSearch,
    decrementOffset:decrementOffset,
    getLatestDiscussion: getLatestDiscussion,
    getUserImages: getUserImages,
    formatDatetime: formatDatetime,
    getNumOfReplies: getNumOfReplies,
    loadLatestDiscussions: loadLatestDiscussions,
    getReplies: getReplies,
    newReply: newReply,
    getLatestTopic: getLatestTopic,
    decrementOffsetForSearch:decrementOffsetForSearch,
    discuss
}