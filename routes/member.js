/**
 * Created by Administrator on 2015-02-04.
 */
var express = require('express');
var router = express.Router();
var DB_member = require('../database/DB_member');
var photo = require('./../public/photo.js');
var async = require('async');
var _ = require('lodash');

router.get('/',function(req,res){
    res.render('home');
});


router.get('/join_email',function(req,res){
    res.render('join/join_email');
});


router.get('/login',function(req,res){
    res.render('join/login');
});
router.post('/login',function(req,res){
    console.log(req.body);
    DB_member.login(req.body,function(data){
        if(data.isSuccess) {
            req.session.profile = data.profile;
        }
        res.json(data);
    })
});


router.post('/getProfile',function(req,res){
        res.json({profile:req.session.profile});
});




router.post('/logout',function(req,res) {
    req.session.destroy();
    res.json({isSuccess:1});
})



//router.post('/join_tutor',function(req,res){
//    console.log(req.files);
//    async.waterfall([
//        function(callback){
//            if(req.files.photo) {
//                arr = photo.uploadfunc_join(req.files.photo, req.body.email);
//            }
//            callback(null,arr);
//        },
//        function(arr,callback){
//            console.log(arr);
//            req.body.photo = arr.photo===undefined?null:arr.photo;
//            req.body.thumbnail = arr.thumbnail===undefined?null:arr.thumbnail;
//            console.log(req.body);
//            DB_member.join_tutor(req.body,function(data){
//                callback(null,data);
//            });
//
//        }
//    ],function(err,data){
//        res.json(data);
//    })
//
//})


router.post('/join_tutor',function(req,res){
    console.log(req.files);
    console.log(req.body);
    DB_member.join_tutor(req.body,req.files.photo,function(data){
        res.json(data);
//        if(data.isSuccess == 1){
//            res.redirect('/member/login');
//        }
//        else{
//            res.redirect('/');
//        }
    });

})


router.post('/join_tutee',function(req,res){
    console.log(req.files);
    console.log(req.body);
    DB_member.join_tutee(req.body,req.files.photo,function(data){
//        if(data.isSuccess == 1){
//            res.redirect('/member/login');
//        }
//        else{
//            res.redirect('/');
//        }
        res.json(data);
    });

})



router.get('/recommend_tutor/:page',function(req,res){
    var values = {};
    values.page = req.params.page;
    values.logined = req.session.profile.email;
    DB_member.recommend_tutor(values,function(data){
//        res.json(data);
        res.render('member/recommend_tutor',_.merge(data,{profile:req.session.profile}));
    });
});


router.post('/recommend_tutor',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_member.recommend_tutor(req.body,function(data){
        res.json(data);
//        res.render('member/recommend_tutor',_.merge(data,{profile:req.session.profile}));
    });
});

router.get('/recommend_user/:page',function(req,res){
    var values = {};
    values.page = req.params.page;
    values.logined = req.session.profile.email;
    DB_member.recommend_user(values,function(data){
//        res.json(data);
        res.render('member/recommend_user',_.merge(data,{profile:req.session.profile}));
    });
})


router.post('/recommend_user',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_member.recommend_user(req.body,function(data){
        res.json(data);
//        res.render('member/recommend_tutor',_.merge(data,{profile:req.session.profile}));
    });
})

router.post('/send_pw', function(req, res){
    DB_member.send_pw(req.body,function(data){
//        res.json(data);
            res.redirect('/');
    })

});

router.post('/reset_pw_form', function(req, res){
    DB_member.reset_pw_form(req.body,function(data){
        if(data.isSuccess == 1){
            res.render('findPassword', { "email" : req.body.email});
        }
        else res.render('error',{message:data.message})
    })
});


router.post('/reset_pw',function(req, res){
    DB_member.reset_pw(req.body, function(data){
        res.json(data);
    });
});



module.exports = router;




