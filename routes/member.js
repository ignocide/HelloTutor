var express = require('express');
var router = express.Router();
var DB_member = require('../database/DB_member');
var photo = require('./../public/photo.js');
var async = require('async');
var _ = require('lodash');

//로그인
router.post('/login',function(req,res){
    console.log(req.body);
    DB_member.login(req.body,function(data){
        if(data.isSuccess) {
            req.session.profile = data.profile;
        }
        res.json(data);
    })
});

//프로필 요청
router.post('/getProfile',function(req,res){
        res.json({profile:req.session.profile});
});

//로그아웃
router.post('/logout',function(req,res) {
    req.session.destroy();
    res.json({isSuccess:1});
});

//선생님 회원가입
router.post('/join_tutor',function(req,res){
    console.log(req.files);
    console.log(req.body);
    DB_member.join_tutor(req.body,req.files.photo,function(data){
        res.json(data);
    });
});

//일반인 회원가입
router.post('/join_tutee',function(req,res){
    console.log(req.files);
    console.log(req.body);
    DB_member.join_tutee(req.body,req.files.photo,function(data){
        res.json(data);
    });
});

//선생님 추천 리스트
router.post('/recommend_tutor',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_member.recommend_tutor(req.body,function(data){
        res.json(data);
    });
});

//일반인 추천 리스트
router.post('/recommend_user',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_member.recommend_user(req.body,function(data){
        res.json(data);
    });
});

//비밀번호 재설정 요청(이메일 보내기)
router.post('/send_pw', function(req, res){
    DB_member.send_pw(req.body,function(data){
        res.json(data);
//            res.redirect('/');
    })

});

//비밀번호 재설정 페이지로 이동
router.post('/reset_pw_form', function(req, res){
    DB_member.reset_pw_form(req.body,function(data){
        if(data.isSuccess == 1){
            res.render('findPassword', { "email" : req.body.email});
        }
        else res.render('error',{message:data.message})
    })
});

//비밀번호 재설정
router.post('/reset_pw',function(req, res){
    DB_member.reset_pw(req.body, function(data){
        res.json(data);
    });
});



module.exports = router;




