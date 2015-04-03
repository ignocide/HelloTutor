var express = require('express');
var router = express.Router();
var DB_search = require('../database/DB_search');
var photo = require('./../public/photo.js');
var async = require('async');

//사람 검색
router.post('/people',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_search.people(req.body,function(data){
        res.json(data);
    });
})

//선생님 검생
router.post('/tutor',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_search.tutor(req.body,function(data){
        res.json(data);
    });

});

//수업 검색
router.post('/course',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_search.course(req.body,function(data){
        res.json(data);
    });
});

module.exports = router;




