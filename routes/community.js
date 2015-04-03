var express = require('express');
var router = express.Router();
var DB_community = require('../database/DB_community');
var photo = require('./../public/photo.js');
var _ = require('lodash');

//팔로우 추가
router.post('/follow_add',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.follow_add(req.body,function(data){
        res.json(data);
    });
});

//팔로우 삭제(팔로우 취소)
router.post('/follow_break',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.follow_break(req.body,function(data){
        res.json(data);
    });
});

//친구 요청
router.post('/friend_req',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.friend_req(req.body,function(data){
        res.json(data);
    });
});

//친구 수락
router.post('/friend_agree',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.friend_agree(req.body,function(data){
        res.json(data);
    });
});

//친구 삭제
router.post('/friend_break',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.friend_break(req.body,function(data){
        res.json(data);
    });
});

//친구 리스트
router.post('/friend_list',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_community.friend_list(req.body,function(data){
        res.json(data);
    });
});

//팔로우 리스트
router.post('/follower_list',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_community.follow_list(req.body,function(data){
        res.json(data);
    });
});

//알람 상태 삭제
router.post('/alarm_relation_del',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_community.alarm_relation_del(req.body,function(data){
        res.json(data);
    });
});

module.exports = router;




