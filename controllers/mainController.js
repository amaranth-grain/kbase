const express = require('express');
const mod = require('../models/usersData');

exports.getHome = (req, res, next) => {
    let userId = req.session.userId;
    mod.getUser(userId).then(data => {       
        user = {
            imgUrl: data["rows"][0].imageurl,
            name: data["rows"][0].name,
            lastname: data["rows"][0].lastname,
            numPost: data["rows"][0].num_posts,
            numMsg: data["rows"][0].num_messages,
            numLike: data["rows"][0].num_likes,
            tagline: data["rows"][0].about,
            id: data["rows"][0].id
        }
        let profile = user;
        profile["profilePath"] = `/profile/${user.id}`;
        profile["topics"] = ["NodeJS", "Java", "SQL", "PHP", "Zend"];
        res.profile = profile;
        next();
        // let {imageurl, name, lastname, num_posts, num_messages, num_likes, about, id} = user;
        // let profilePath = `/profile/${id}`
        // let topics = ["NodeJS", "Java", "SQL", "PHP", "Zend"];
        // res.render('home', {imageurl, name, lastname, num_posts, num_messages, num_likes, about, profilePath, topics})
    }).catch(err => console.log("Error: Problem with getting user from DB. ", err));
}

exports.getProfile = (req, res) => {
    mod.getUser(req.params.userId).then(data => {
        let {name, lastname, country, about, id, imageurl} = data["rows"][0];
        let profilePath = `/profile/${id}`;
        console.log("profile info: ", name, lastname, country, about, profilePath, imageurl);
        res.render('profile', {name, lastname, imageurl, country, about, profilePath});
    });
}