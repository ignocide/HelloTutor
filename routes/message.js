var express = require('express');
var router = express.Router();
var DB_message = require('../database/DB_message');
var photo = require('../public/photo.js');
var _ = require('lodash');

router.post('/send',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.send(req.body,function(data){
        res.json(data);
    });
})


router.post('/list',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.getList(req.body,function(data){
        res.json(data);
//        res.render('message/list',_.merge(data,{profile:req.session.profile}));
    });
});



router.get('/list',function(req,res){
    req.body.logined = req.session.profile.email;

    DB_message.getList2(req.body,function(data){
//        res.json(data);
        res.render('message/list',_.merge(data,{profile:req.session.profile}));
    });
});


router.post('/read',function(req,res){
    req.body.logined = req.session.profile.email;

    DB_message.read(req.body,function(data){
        res.json(data);
    });
});


router.post('/delete',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.del(req.body,function(data){
        res.json(data);
    });
})


router.get('/notice',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.notice(req.body,function(data){
//        res.json(data);
        res.render('message/notice',_.merge(data,{profile:req.session.profile}));
    });

})

router.get('/alarm',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.alarm(req.body,function(data){
        res.json(data);
//        res.render('message/alarm',data,{profile:req.session.profile}));
    });
});


router.post('/alarm',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.alarm(req.body,function(data){
        res.json(data);
//        res.render('message/alarm',data,{profile:req.session.profile}));
    });
});

router.post('/del_alarm',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.del_alarm(req.body,function(data){
        res.json(data);
    });
});



router.post('/notice',function(req,res){
    req.body.logined = req.session.profile.email;
    DB_message.notice(req.body,function(data){
//        res.json(data);
        res.json(data);
    });

})



module.exports = router;




