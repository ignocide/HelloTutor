/**
 * Created by Administrator on 2015-02-05.
 */
/**
 * Created by Administrator on 2015-02-04.
 */
var express = require('express');
var router = express.Router();
var DB_community = require('../database/DB_community');
var photo = require('./../public/photo.js');
var _ = require('lodash');

router.post('/follow_add',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.follow_add(req.body,function(data){
        res.json(data);
    });
})


router.post('/follow_break',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.follow_break(req.body,function(data){
        res.json(data);
    });
})


router.post('/friend_req',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.friend_req(req.body,function(data){
        res.json(data);
    });
})


router.post('/friend_agree',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.friend_agree(req.body,function(data){
        res.json(data);
    });
});


router.post('/friend_break',function(req,res){
    req.body.logined = req.session.profile.email;
    console.log(req.body);
    DB_community.friend_break(req.body,function(data){
        res.json(data);
    });
});



router.post('/friend_list',function(req,res){
    req.body.logined = req.session.profile.email;
//    console.log(req.body);
    DB_community.friend_list(req.body,function(data){
        res.json(data);
    });
});

router.get('/friend_list',function(req,res){
    req.body.logined = req.session.profile.email;
//    console.log(req.body);
    DB_community.friend_list(req.body,function(data){
        res.render('community/friend_list',_.merge(data,{profile:req.session.profile}));
    });
});

router.get('/follower_list',function(req,res){
    req.body.logined = req.session.profile.email;
//    console.log(req.body);
    DB_community.follow_list(req.body,function(data){
        res.render('community/follower_list',_.merge(data,{profile:req.session.profile}));
    });
});


router.post('/follower_list',function(req,res){
    req.body.logined = req.session.profile.email;
//    console.log(req.body);
    DB_community.follow_list(req.body,function(data){
//        res.render('community/follower_list',_.merge(data,{profile:req.session.profile}));
        res.json(data);
    });
});

//router.post('/friend_break',function(req,res){
//    req.body.logined = 'b@b.com';
//    console.log(req.body);
//    DB_community.friend_agree(req.body,function(data){
//        res.json(data);
//    });
//});

router.post('/alarm_relation_del',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_community.alram_relation_del(req.body,function(data){
        res.json(data);
    });
});




module.exports = router;




