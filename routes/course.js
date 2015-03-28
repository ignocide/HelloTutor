/**
 * Created by Administrator on 2015-01-23.
 */
var express = require('express');
var router = express.Router();
var DB_course = require('../database/DB_course');
var photo = require('./../public/photo.js');
var async = require('async');
var _ = require('lodash');
//creat by joonho
router.post('/info', function(req, res){
    req.body.logined = req.session.profile.email;
    req.body.num = req.body.num;
    DB_course.course_detail(req.body, function (data) {
        console.log(data);
        res.json(data);
    });
});


router.get('/info/:num', function(req, res){
    var values = {};
//    values.logined = 'c@c.com' // req.session.email
    values.logined = req.session.profile.email;
    values.num = req.params.num;
    DB_course.course_detail(values, function (data) {
//        console.log(data);
//        res.json(data);
        console.log(_.merge(data,{profile:req.session.profile}));
        res.render('course/info',_.merge(data,{profile:req.session.profile}));
    });
});


router.get('/write', function(req, res){
    if(req.session.profile.isTutor == 1){
        res.render('course/write');
    }
    else{
        res.redirect('board/main/1');
    }

});
//
//
//router.post('/write',function(req,res){
//    req.body.logined = "tutor@tutor.com";
//    console.log(req.files);
//
//    async.waterfall([
//        function(callback){
//            var arr={};
//            if(req.files.photo) {
//                arr = photo.uploadfunc_course(req.files.photo);
//            }
//            callback(null,arr);
//        },
//        function(arr,callback){
//            console.log(arr);
//            req.body.photo = arr.photo==undefined?null:arr.photo;
//            req.body.photo_org_name = arr.photo_org_name===undefined?null:arr.photo_org_name;
//            req.body.thumbnail = arr.thumbnail===undefined?null:arr.thumbnail;
//            console.log(req.body);
//            DB_course.write(req.body,function(data){
//                callback(null,data);
//            });
//
//        }
//    ],function(err,data){
//        res.json(data);
//    })
//
//})





router.post('/write',function(req,res){
//    req.body.logined = "tutor@tutor.com";
//    console.log(req.files);
        console.log(req.files);
    req.body.logined = req.session.profile.email;
    var photo = req.files.photo;
    DB_course.write(req.body,photo,function(data){
            res.json(data);
//        res.redirect('/board/main/1');
    });
})


//router.post('/modify',function(req,res){
//    req.body.logined = "tutor@tutor.com";
//    console.log(req.files);
//
//    async.waterfall([
//        function(callback){
//            if(req.files.photo) {
//                arr = photo.uploadfunc_course(req.files.photo);
//            }
//            callback(null,arr);
//        },
//        function(arr,callback){
//            console.log(arr);
//            req.body.photo = arr.photo===undefined?null:arr.photo;
//            req.body.photo_org_name = arr.photo_org_name===undefined?null:arr.photo_org_name;
//            req.body.thumbnail = arr.thumbnail===undefined?null:arr.thumbnail;
//            console.log(req.body);
//            DB_course.modify(req.body,function(data){
//                console.log(data);
//                callback(null,data);
//            });
//
//        }
//    ],function(err,data){
//        res.json(data);
//    })
//
//})

router.post('/modify',function(req,res){
    req.body.logined = "tutor@tutor.com";
    console.log(req.files);

    DB_course.modify(req.body,req.files.photo,function(data){
        res.json(data);
    });

})

router.post('/delete',function(req,res){
    req.body.logined = 'tutor@tutor.com';
    DB_course.delete(req.body,function(data){
        res.json(data);
    });
})



router.post('/review_write', function(req,res){
    req.body.logined = req.session.profile.email
    console.log(req.body);
    DB_course.review_write(req.body,function(data){
        res.json(data)
    })
})



router.post('/review_modify', function(req,res){
    req.body.logined = 'a@a.com';

    DB_course.review_modify(req.body,function(data){
        res.json(data)
    })
});

router.post('/review_delete', function(req,res){
    req.body.logined = 'a@a.com';

    DB_course.review_delete(req.body,function(data){
        res.json(data)
    })
});

router.post('/review_good', function(req,res){
    req.body.logined = req.session.profile.email;

    DB_course.review_good(req.body,function(data){
        res.json(data)
    })
});

router.post('/review_good_del', function(req,res){
    req.body.logined = req.session.profile.email;

    DB_course.review_good_del(req.body,function(data){
        res.json(data)
    })
});


module.exports = router;
