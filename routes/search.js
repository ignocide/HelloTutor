/**
 * Created by Administrator on 2015-02-04.
 */
var express = require('express');
var router = express.Router();
var DB_search = require('../database/DB_search');
var photo = require('./../public/photo.js');
var async = require('async');


router.get('/people',function(req,res){
    res.render('search/people',req.session);
})


router.get('/',function(req,res){
    res.render('search/search',req.session);
})



router.get('/tutor',function(req,res){
    res.render('search/tutor',req.session);
})

router.get('/course',function(req,res){
    res.render('search/course',req.session);
})


router.post('/people',function(req,res){
    //req.body.logined = req.session.email;
//    req.body.logined = 'b@b.com';
    req.body.logined = req.session.profile.email;
    DB_search.people(req.body,function(data){
        res.json(data);
    });
})


router.post('/tutor',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_search.tutor(req.body,function(data){
        res.json(data);
    });

})



router.post('/course',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_search.course(req.body,function(data){
        res.json(data);
    });

})

module.exports = router;




