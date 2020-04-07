const mod = require('../models/usersData');
const mod2 = require('../models/discussionData');

function getHome(req,res,next) {
    let userId = req.session.userId;
    var posts;
    var messages;
    mod.getNumOfPosts(req.session.userId).then(data=> {
      posts = data.rows[0].count
    mod.getNumOfLikes(req.session.userId).then(data => {
      likes = data.rows[0].count;
    }).then(data =>{
    mod.getNumOfMessages(req.session.userId).then(data => {
      messages = data.rows[0].count;
    }).then(data => {
      mod.getUser(userId).then(data => {       
        user = {
            imgUrl: data["rows"][0].imageurl,
            name: data["rows"][0].name,
            lastname: data["rows"][0].lastname,
            numPost: posts,
            numMsg: messages,
            numLike: likes,
            tagline: data["rows"][0].about,
            id: data["rows"][0].id
        }
        let profile = user;
        profile["profilePath"] = `/profile/${user.id}`;
        profile["editPath"] = `/profile/${user.id}/edit`;
        profile["topics"] = ["NodeJS", "Java", "SQL", "PHP", "Zend"];
        res.profile = profile;
        if(req.body.topic != undefined){
          res.topic = req.body.topic;
        }
        next();
    })
  })
})
}).catch(err => console.log("Error: Problem with getting user from DB. ", err));
}

function likeProfile(req,res,next){
  var notOwnProfile = true;
  if (req.session.userId != req.body.userId) {
    
      mod.incrementNumOfLikes(req.body.userId,req.session.userId).catch((err) => console.log(err));
  }
  var id = req.body.userId;
  var profile;
  var profilePath;
  var discussions;
  var likes;
  var posts;
  var alreadyLiked;
  mod.checkLiked(req.body.userId,req.session.userId).then(data=>{
    if(data.rows[0].count >= 1){
      alreadyLiked = true;
    } else {
      already_liked = false;
    }
  mod.getNumOfPosts(req.session.userId).then(data=> {
    posts = data.rows[0].count
  mod.getNumOfLikes(req.body.userId).then(data => {
    
    likes = data.rows[0].count;
  }).then(data=>{
  mod.getUser(id).then(data => {
      profile = data["rows"][0];
      profilePath = `/profile/${id}`;
  }).then(()=>{
      mod2.getDiscussionsByUser(id).then(data => {
          var {name, lastname, country, about, id, imageurl} = profile;
          discussions = data.rows;
          discussions.forEach((element) => {
              element.imageurl = imageurl;
              let date = new Date(Date.parse(element.datetime + "+0000"));
              element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
          })
          
          res.render('profile', {name, lastname, imageurl, country, id, about, profilePath, discussion: discussions,likes:likes,posts:posts,alreadyLiked:alreadyLiked,notOwnProfile:notOwnProfile});
      }).catch((err) => console.log(err));

  })
})
})
}).catch(err => {
  console.log("Error: Problem with like function on user profile. ", err);
});  
}


function getProfile(req,res,next) {
    var notOwnProfile = true;
    if (req.session.userId == req.params.userId) {
      notOwnProfile = false;
    }
    var id = req.params.userId;
    var profile;
    var profilePath;
    var discussions;
    var likes;
    var posts;
    var alreadyLiked;
    mod.checkLiked(req.params.userId,req.session.userId).then(data=>{
      if(data.rows[0].count >= 1){
        alreadyLiked = true;
      } else {
        already_liked = false;
      }
    mod.getNumOfLikes(req.params.userId).then(data => {
      
      likes = data.rows[0].count;
    }).then(data => {
    mod.getNumOfPosts(req.session.userId).then(data => {
      posts = data.rows[0].count;
    }).then(data=>{
    mod.getUser(id).then(data => {
        profile = data["rows"][0];
        profilePath = `/profile/${id}`;
    }).then(()=>{
        mod2.getDiscussionsByUser(id).then(data => {
            var {name, lastname, country, about, id, imageurl} = profile;
            discussions = data.rows;
            discussions.forEach((element) => {
                element.imageurl = imageurl;
                let date = new Date(Date.parse(element.datetime + "+0000"));
                element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
            })
            
            res.render('profile', {name, lastname, imageurl, country, id, about, profilePath, discussion: discussions,likes:likes,posts:posts,alreadyLiked:alreadyLiked,notOwnProfile:notOwnProfile});
        }).catch((err) => console.log(err));

    })
  })
})
    }).catch(err => {
      console.log("Error: Problem with retrieving profile page. ", err);
    });
}

/* Direct user to edit profile page */
const getEditProfile = (req, res) => {
    //Redirect user to homepage if they attempt to visit edit profile page of another user
    if (req.session.userId != req.params.userId) {
      return res.redirect("/home");
    }
    mod
      .getUser(req.params.userId)
      .then((data) => {
        let { name, lastname, country, about, id, imageurl } = data["rows"][0];
        let btnText = "update profile";
        res.render("edit-profile", {
          name,
          lastname,
          imageurl,
          country,
          about,
          btnText,
        });
      })
      .catch((err) =>
        console.log("Error: Problem with rendering edit profile page. ", err)
      );
  };
  
/* Modify the user's profile information*/
const edit = (req, res, next) => {
    let id = req.session.userId;
    let user = {
      imgUrl: req.body.imgUrl,
      about: req.body.about,
      country: req.body.country,
      dob: req.body.dob,
    };
    mod.updateProfile(id, user);
    next();
  };

/* Search for discussions with keyword in subject, and store in res.results */
const search = (req, res, next) => {
  let keyword = req.body.search;
  mod2.searchForSubject(keyword).then(data => {
    res.results = data["rows"];
    next();
  }).catch(err => {
    console.log("Error: Problem with searching discussions by keyword. ", err);
  });
}

/* Get the avatar of the person who posted discussion post */
const getImage = async discussion => {
  let data = await mod.getUser(discussion.user_id);
  return data["rows"][0].imageurl;
}
/* Get the number of replies within this discussion */
const getNumReplies = async discussion => {
  let data = await mod2.getNumOfReplies(discussion.discussion_id);
  return parseInt(data.rows[0].count);
}
/* Get the date of the curent post */
const getDate = async discussion => {
  let date = new Date(Date.parse(discussion.datetime + "+0000"));
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`
}
/* Get all images within these results */
const getAllImages = async res => {
  return Promise.all(res.results.map(e => getImage(e))).catch(err => {
    console.log("Error: Trouble retrieving images for discussion search. ", err);
  });;
}
/* Get all reply counts within these results */
const getAllNumReplies = async res => {
  return Promise.all(res.results.map(e => getNumReplies(e))).catch(err => {
    console.log("Error: Trouble retrieving replies for discussion search. ", err);
  });;
}
/* Get all dates of when discussion was posted within these results */
const getAllDates = async res => {
  return Promise.all(res.results.map(e => getDate(e))).catch(err => {
    console.log("Error: Trouble retrieving dates for discussion search. ", err);
  });;
}
/* Get all images, replies, and dates */
const getAllData = async res => {
  return Promise.all([getAllImages(res), getAllNumReplies(res), getAllDates(res)]).catch(err => {
    console.log("Error: Trouble retrieving data for discussion search. ", err);
  });
}
/* Display search results */
const displaySearch = (req, res) => {
  let discussion = res.results;
  getAllData(res).then(data => {
    if (data[0].length == 0) {
      res.render("search", {msg: "No search results found."});
    } else {
      for (let i = 0; i < data[0].length; i++) {
        discussion[i].imageurl = data[0][i];
        discussion[i].numReplies = data[1][i];
        discussion[i].date = data[2][i];
      }
      res.render("search", {discussion});
    }
  }).catch(err => {
    console.log("Error: Problem with parsing discussion related data. ", err);
  })
}

module.exports = {
    getProfile,
    getHome,
    edit,
    getEditProfile,
    likeProfile:likeProfile,
    search,
    displaySearch
}


