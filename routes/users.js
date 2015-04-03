var express = require('express');
var DB_user = require('../database/DB_user');
var router = express.Router();
var _ = require('lodash');

//선생님 간단프로필
router.post('/tutor_simple', function(req, res) {
    req.body.logined = req.session.profile.email;
    console.log("tutor_simple");
    console.log(req.body);
    DB_user.getTutor_info(req.body, function (data) {
        res.json(data);
    });
});

//선생님 상세 프로필
router.post('/tutor_detail', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.getTutor_detail(req.body, function (data) {
        res.json(data);
    });
});

//선생님 프로필 수정
// 프로필 photo 를 변경하면 photo를 thumnail 처리는 어떻게 ??
router.post('/modify_tutor',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_tutor(req.body,function(data){
        res.json(data);
    });
});

//경력수정
router.post('/modify_career', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_career(req.body, function(data){
        res.json(data);
    });
});

//경력 쓰기
router.post('/write_career', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.write_career(req.body, function(data){
        res.json(data);
    });
});

//경력 삭제
router.post('/delete_career', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.del_career(req.body, function(data){
        res.json(data);
    });
});

//과목 수정
router.post('/modify_subject', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_subject(req.body, function(data){
        res.json(data);
    });
});

//일반인 간단 프로필
router.post('/tutee_simple', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.tutee_simple(req.body, function (data) {
        res.json(data);
    });
});

//일반인 간단 프로필(위와 같음)
router.post('/user_simple', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.tutee_simple(req.body, function (data) {
        console.log(data);
        res.json(data);
    });
});

//간단프로필 수정
router.post('/modify_tutee', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_stu(req.body, function(data){
        res.json(data);
    });
});

//이메일 중복체크
router.post('/check_email', function(req, res){
    DB_user.check_email(req.body, function(data){
        res.json(data);
    });
});

module.exports = router;
