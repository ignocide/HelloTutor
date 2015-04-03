/**
 * Created by Administrator on 2015-01-23.
 */
var express = require('express');
var router = express.Router();
var DB_board = require('../database/DB_board');
var _ = require('lodash');

//메인피드 호출
router.post('/main', function(req, res) {
    var values ={};
    values.page = req.body.page;
    values.logined = req.session.profile.email;
    DB_board.main(values,function(data){
//        console.log(_.merge(data,{profile:req.session.profile}));
        res.json(data);
    })
});

//알고리즘 미적용 메인피드 호출(테스트용)
router.post('/main2', function(req, res) {
    var values ={};
    values.page = req.body.page;
    values.logined = req.session.profile.email;
    DB_board.main2(values,function(data){
//        console.log(_.merge(data,{profile:req.session.profile}));
        res.json(data);
    })
});

//게시물 리스트
router.post('/list', function(req, res) {
    req.body.logined = req.session.profile.email;
    DB_board.list(req.body,function(data){
       res.json(data);
    });
});

//게시물 읽기
router.post('/read', function(req, res) {
    var values ={};
    values.num = req.body.num;
    values.logined = req.session.profile.email;
    console.log(values);
    DB_board.read(values,function(data){
        res.json(data);
    });
});

//게시물 쓰기
router.post('/write', function(req, res) {
    console.log("req.files.photo",req.files);

    req.body.logined = req.session.profile.email;
    console.log(req.body);
    console.log(req.body.photo);
    DB_board.write(req.body,req.files.photo,function(data){
        res.json(data);
    });
});

//게시물 수정
router.post('/modify',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_board.modify(req.body,req.files.photo,function(data){
        res.json(data);
    });
})

//게시물 삭제
router.post('/delete',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_board.delete(req.body,req.files.photo,function(data){
        res.json(data);
    });
})


//댓글 쓰기
router.post('/write_comment', function(req, res) {
    req.body.logined = req.session.profile.email;
    DB_board.write_comment(req.body,function(data){
        res.json(data);
    });
});

//댓글 수정
router.post('/modify_comment', function(req, res) {
    req.body.logined = req.session.profile.email;
    console.log(req.body.num);
    DB_board.modify_comment(req.body,function(data){
        res.json(data);
    });
});

//댓글 삭제
router.post('/delete_comment', function(req, res) {
    req.body.logined = req.session.profile.email;
    DB_board.delete_comment(req.body,function(data){
        res.json(data);
    });
});

//글 좋아요
router.post('/good_req',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_board.good_req(req.body,function(data){
        res.json(data);
    });
});

//글 좋아요 취소
router.post('/good_del',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_board.good_del(req.body,function(data){
        res.json(data);
    });
});

//학교 검색
router.post('/school_search',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_board.school_search(req.body,function(data){
        res.json(data);
    });
});


module.exports = router;
