var express = require('express');
var router = express.Router();
var DB_course = require('../database/DB_course');
var photo = require('./../public/photo.js');
var async = require('async');
var _ = require('lodash');

//수업 읽기
router.post('/info', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_course.course_detail(req.body, function (data) {
        console.log(data);
        res.json(data);
    });
});

//수업 작성
router.post('/write',function(req,res){
        console.log(req.files);
    req.body.logined = req.session.profile.email;
    var photo = req.files.photo;
    DB_course.write(req.body,photo,function(data){
            res.json(data);
    });
});

//수업 수정
router.post('/modify',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.files);
    DB_course.modify(req.body,req.files.photo,function(data){
        res.json(data);
    });
});

//수업 삭제
router.post('/delete',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_course.delete(req.body,function(data){
        res.json(data);
    });
});

//리뷰 작성
router.post('/review_write', function(req,res){
    req.body.logined = req.session.profile.email
    console.log(req.body);
    DB_course.review_write(req.body,function(data){
        res.json(data)
    })
});


//리뷰 수정
router.post('/review_modify', function(req,res){
    req.body.logined = 'a@a.com';

    DB_course.review_modify(req.body,function(data){
        res.json(data)
    })
});

//리뷰 삭제
router.post('/review_delete', function(req,res){
    req.body.logined = req.session.profile.email;
    req.body.logined = req.session.profile.email;
    DB_course.review_delete(req.body,function(data){
        res.json(data)
    })
});

//리뷰 좋아요
router.post('/review_good', function(req,res){
    req.body.logined = req.session.profile.email;
    DB_course.review_good(req.body,function(data){
        res.json(data)
    })
});

//리뷰 수정
router.post('/review_good_del', function(req,res){
    req.body.logined = req.session.profile.email;
    DB_course.review_good_del(req.body,function(data){
        res.json(data)
    })
});


module.exports = router;
