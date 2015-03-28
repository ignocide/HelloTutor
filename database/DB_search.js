var mysql = require('./config');
var sql = require('./sqls');
var pool  = mysql.pool;
var _ = require('lodash');
var async = require('async');
//var crypto = require('crypto');
var msg = require('./msg');
var custom = require('./etc');
exports.people = function(values,callback){
    var size = 20;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
//사용자, 사용자, 사용자, 사용자, keyword
        else {
            connection.query(sql.search_people, ['%' + values.keyword + '%',values.logined, (values.page-1)*size,size], function (err, rows, result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    })
}



exports.tutor = function(values,callback){
    var input = {};
    input.email = values.logined;
    input.keyword = values.keyword;
    var size = 20;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
//사용자, 사용자, 사용자, 사용자, keyword
        else{
            async.waterfall([
                function(callback){
                    connection.query(sql.search_totur, ['%'+values.keyword+'%','%'+values.keyword+'%',values.logined, (values.page-1)*size,size], function (err, rows,result) {
                        console.log(this.sql);
                        if(err) callback(err);
                        else callback(null,rows);
                    });
                },
                function(rows,callback){
//                    async.each(rows,function(item,callback_each){
//                        var target = item.email;
//                        connection.query(sql.getSubject, [target], function (err, subjects, result) {
//                            if (err) callback_each(err);
//                            else{
//                                item.subjects = custom.to_array(subjects, "subjects").subjects;
//                                callback_each();
//                            }
//                        });
//                    },function(err){
//                        if (err) callback(err)
//                        else (null, rows);
//                    });
//                }
                    async.each(rows,function(item,callback_each) {
                        connection.query(sql.getSubject, [item.email], function (err, subjects, result) {
                            console.log("subjects",subjects);
                            console.log(err);
                            if (err) callback_each(err);
//                            else if (subjects.length == 0) callback_each(null);
                            else if (subjects.length >=0) {
                                console.log(1);
                                item.subjects = custom.to_array(subjects, "subjects").subjects;
                                callback_each(null);
                            }
                            else callback_each(msg.err_unknown);
                        })
                    },function(err){
                        if(err) callback(err);
                        else callback(null,rows);
                    });
                }
            ],function(err,data){
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:data},callback);
            })
        }
    })
};




exports.course = function(values,callback){
    var input = {};
    input.email = values.logined;
    input.keyword = values.keyword;
    size = 20;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
//사용자, 사용자, 사용자, 사용자, keyword
        else {
            async.waterfall([
                function (callback) {
                    connection.query(sql.search_course, [values.logined, '%' + values.keyword + '%', '%' + values.keyword + '%',(values.page-1)*size,size], function (err, rows, result) {
                        console.log(rows);
                        if (err) callback(err);
                         else callback(null, rows);
                    });
                },
                function (rows, callback) {
                    console.log(rows);
                    async.each(rows, function (item, callback_each) {
                        var target = item.email;
                        connection.query(sql.getSubject, [target], function (err, subjects, result) {
                            console.log(item);

                            console.log(subjects);
                            if (err) callback_each(err);
                            else {
                                item.subjects = custom.to_array(subjects, "subjects").subjects;
                                callback_each();
                            }
                        });
                    }, function (err) {
                        if (err) callback(err);
                        else callback(null, rows);
                    });
                }
            ], function (err, data) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:data},callback);
            })
        }
    })
};


//
//
//router.post('/login', function(req, res){
//    console.log('req.body', req.body);
//    var id = req.body.id;
//    var input_pass = req.body.pw;
//    pool.getConnection(function(err, conn){
//        if(err) console.error('err',err);
//        conn.query('select id,pw,name,salt from user where id=?', [id], function(err, rows){
//            if(err) console.error('err',err);
//            console.log('rows',rows);
//
//            var db_pass = rows[0].pw;
//            var salt = rows[0].salt;
//            var cryp_pass = crypto.createHash('sha512').update(input_pass + salt).digest('hex');
//            if(cryp_pass == db_pass) {
//                console.log('비밀번호 일치');
//                res.json({result:'OK'});
//            } else {
//                console.log('비밀번호 불일치');
//                res.json({result:'Fail'});
//            }
//        });
//    });
//});