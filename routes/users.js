var express = require('express');
var DB_user = require('../database/DB_user');
var router = express.Router();
var _ = require('lodash');
/* GET users listing. */
router.post('/tutor_simple', function(req, res) {
    req.body.logined = req.session.profile.email;
    console.log("tutor_simple");
    console.log(req.body);
    DB_user.getTutor_info(req.body, function (data) {
//        res.json(data);
//        console.log(_.merge(data,{profile:req.session.profile}));
//        res.render('user/tutor_simple', _.merge(data,{profile:req.session.profile}));
        res.json(data);
    });

});

router.get('/tutor_simple/:email', function(req, res) {
    var values = {};
    values.email = req.params.email;
    values.logined = req.session.profile.email;
    DB_user.getTutor_info(values, function (data) {
//        res.json(data);
        console.log(_.merge(data,{profile:req.session.profile}));
        res.render('user/tutor_simple', _.merge(data,{profile:req.session.profile}));
    });

});

router.post('/tutor_detail', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.getTutor_detail(req.body, function (data) {
        res.json(data);
    });
});

router.get('/tutor_detail/:email', function(req, res){
    var values = {};
    values.email = req.params.email;
    values.logined = req.session.profile.email;
    DB_user.getTutor_detail(values, function (data) {
        res.render('user/tutor_detail', _.merge(data,{profile:req.session.profile}));
    });
});

// 프로필 photo 를 변경하면 photo를 thumnail 처리는 어떻게 ??
router.post('/modify_tutor',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_tutor(req.body,function(data){
        res.json(data);
    });
});

router.post('/modify_career', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_career(req.body, function(data){
        res.json(data);
    });
});

router.post('/write_career', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.write_career(req.body, function(data){
        res.json(data);
    });
});

router.post('/delete_career', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.del_career(req.body, function(data){
        res.json(data);
    });
});

router.post('/modify_subject', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_subject(req.body, function(data){
        res.json(data);
    });
});

router.post('/tutee_simple', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.tutee_simple(req.body, function (data) {
        res.json(data);
    });
});

router.post('/user_simple', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.tutee_simple(req.body, function (data) {
        console.log(data);
        res.json(data);
    });
});


router.get('/tutee_simple/:email', function(req, res){
    var values = {};
    values.email = req.params.email;
    values.logined = req.session.profile.email;
    DB_user.tutee_simple(values, function (data) {
//        res.json(data);
        console.log(data);
        res.render('user/user_simple', _.merge(data,{profile:req.session.profile}));
    });
});

router.post('/modify_tutee', function(req, res){
    req.body.logined = req.session.profile.email;
    DB_user.modify_stu(req.body, function(data){
        res.json(data);
    });
});



router.post('/check_email', function(req, res){
    DB_user.check_email(req.body, function(data){
        res.json(data);
    });
});

module.exports = router;
