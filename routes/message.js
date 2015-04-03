var express = require('express');
var router = express.Router();
var DB_message = require('../database/DB_message');
var photo = require('../public/photo.js');
var _ = require('lodash');

//메세지 보내기
router.post('/send',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.send(req.body,function(data){
        res.json(data);
    });
})

//메세지 리스트
router.post('/list',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.getList(req.body,function(data){
        res.json(data);
    });
});

//메세지 읽기
router.post('/read',function(req,res){
    req.body.logined = req.session.profile.email;

    DB_message.read(req.body,function(data){
        res.json(data);
    });
});

//메세지 삭제하기
router.post('/delete',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.del(req.body,function(data){
        res.json(data);
    });
});

//알람 리스트 가져오기
router.post('/alarm',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.alarm(req.body,function(data){
        res.json(data);
    });
});

//알람 삭제(읽기)
router.post('/del_alarm',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.del_alarm(req.body,function(data){
        res.json(data);
    });
});

//공지사항
router.post('/notice',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.notice(req.body,function(data){
        res.json(data);
    });
});



module.exports = router;




