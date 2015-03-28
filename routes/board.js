/**
 * Created by Administrator on 2015-01-23.
 */
var express = require('express');
var router = express.Router();
var DB_board = require('../database/DB_board');
var _ = require('lodash');
router.get('/main/:page', function(req, res) {
    var values ={};
    values.page = req.params.page;
    values.logined = req.session.profile.email;
//    values.logined = 'a@a.com';
    DB_board.main(values,function(data){
        console.log(_.merge(data,{profile:req.session.profile}));
        res.render('board/main',_.merge(data,{profile:req.session.profile}));
    })
});

router.post('/main', function(req, res) {
    var values ={};
    values.page = req.body.page;
    values.logined = req.session.profile.email;
    DB_board.main(values,function(data){
//        console.log(_.merge(data,{profile:req.session.profile}));
        res.json(data);
    })
});


router.get('/main2/:page', function(req, res) {
    var values ={};
    values.page = req.params.page;
    values.logined = req.session.profile.email;
//    values.logined = 'a@a.com';
    DB_board.main2(values,function(data){
        console.log(_.merge(data,{profile:req.session.profile}));
        res.render('board/main',_.merge(data,{profile:req.session.profile}));
    })
});



router.get('/list/:email/:page', function(req, res) {
    req.params.logined = req.session.profile.email
//    req.params.logined = 'a@a.com';
    DB_board.list(req.params,function(data){
//       res.json(data);
        res.render('board/list',_.merge(data,{profile:req.session.profile}));
    });
});


router.post('/list', function(req, res) {
    req.body.logined = req.session.profile.email
//    req.params.logined = 'a@a.com';
    DB_board.list(req.body,function(data){
       res.json(data);
//        res.render('board/list',_.merge(data,{profile:req.session.profile}));
    });
});


router.get('/read/:num', function(req, res) {
    //req.params.logined = req.session.email
//    req.params.logined = 'a@a.com';
    var values ={};
    values.num = req.params.num;
    values.logined = req.session.profile.email;
    console.log(values);
    DB_board.read(values,function(data){
//    DB_board.read(req.params,function(data){
//        res.json(data);
        console.log("출력완료");
        console.log(_.merge(data,{profile:req.session.profile}));
        res.render('board/read',_.merge(data,{profile:req.session.profile}));
    });
});


router.post('/read', function(req, res) {
    //req.params.logined = req.session.email
//    req.params.logined = 'a@a.com';
    var values ={};
    values.num = req.body.num;
    values.logined = req.session.profile.email;
    console.log(values);
    DB_board.read(values,function(data){
//    DB_board.read(req.params,function(data){
        res.json(data);
//        console.log("출력완료");
//        console.log(_.merge(data,{profile:req.session.profile}));
//        res.render('board/read',_.merge(data,{profile:req.session.profile}));
    });
});


router.get('/write', function(req, res) {
    res.render('board/write');
});

router.post('/write', function(req, res) {
//    req.body.email = req.session.logined;
//    req.body.logined = 'b@b.com';
//    var arr = Object.keys(req.files).length;
    console.log("req.files.photo",req.files);

    req.body.logined = req.session.profile.email;
    console.log(req.body);
    console.log(req.body.photo);
    DB_board.write(req.body,req.files.photo,function(data){
        res.json(data);
//        res.redirect('/board/main/1');
    });
});


router.post('/modify',function(req,res){
    console.log(req.body);
    req.body.logined = 'b@b.com';
    DB_board.modify(req.body,req.files.photo,function(data){
        res.json(data);
    });
})


router.post('/delete',function(req,res){
    req.body.logined = 'b@b.com';
    DB_board.delete(req.body,req.files.photo,function(data){
        res.json(data);
    });
})


//오류 처리 안함
router.post('/write_comment', function(req, res) {
//    req.body.logined = 'b@b.com';
//    var arr = Object.keys(req.files).length;
    req.body.logined = req.session.profile.email;
    console.log("!!!!",req.body.grp);
    DB_board.write_comment(req.body,function(data){
        res.json(data);
//        res.redirect('/board/read/'+req.body.grp);
    });

});


router.post('/modify_comment', function(req, res) {
//    req.body.logined = 'b@b.com';
    req.body.logined = req.session.profile.email;
    console.log(req.body.num);
    DB_board.modify_comment(req.body,function(data){
//        res.json(data);
        res.redirect('board/read/'+req.body.num);
    });
});

router.post('/delete_comment', function(req, res) {
    req.body.logined = 'b@b.com';
//    var arr = Object.keys(req.files).length;

    DB_board.delete_comment(req.body,function(data){
        res.json(data);
    });
});


router.post('/good_req',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_board.good_req(req.body,function(data){
        res.json(data);
    });
});

router.post('/good_del',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_board.good_del(req.body,function(data){
        res.json(data);
    });
});


router.post('/school_search',function(req,res){
//    req.body.logined = req.session.profile.email;
    DB_board.school_search(req.body,function(data){
        res.json(data);
    });
});


module.exports = router;
