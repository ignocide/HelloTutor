var mysql = require('./config');
var sql = require('./sqls');
var pool  = mysql.pool;
var async = require('async');
var crypto = require('crypto');
var photo = require('../public/photo');
var msg = require('./msg');
var mail = require('./mailing');
var custom = require('./etc');

//선생님 수업 입력 안됨
exports.join_tutor = function(values,files,callback){
    var input = {};
    var salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var cryp_pass = crypto.createHash('sha512').update(values.pw + salt).digest('hex');
    input.email = values.email;
    input.pw = cryp_pass;
    input.salt = salt;
    input.isTutor = 1;
    input.last_name = values.last_name;
    input.first_name = values.first_name;
    input.gender = values.gender;
    input.birthday = values.birthday;
    input.address_si = values.address_si;
    input.address_gu = values.address_gu;

    pool.getConnection(function(err,connection) {
        if(err) msg.err_return(err,callback);
        else{
            connection.beginTransaction(function(err) {
                async.waterfall([
                    function (callback){
                        if (err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        photo.uploadfunc_join(files,values.email,function(err,photo_info){
                            if(err) callback(err);
                            else callback(null,photo_info);
                        });
                    },
                    function (photo_info,callback) {
                        if(photo_info != null){
                            input.photo = photo_info.photo;
                            input.thumbnail = photo_info.thumbnail;
                            input.photo_org_name = photo_info.originalname;
                        }
                        console.log(input);
                        connection.query(sql.join_common, input, function (err, result) {
                            if (err) callback(err);
                            else if (!result.affectedRows) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
                    },
                    function (callback) {
                        connection.query(sql.join_tutor, [values.email, null, null], function (err, result) {
                            if (err) callback(err);
                            else if (!result.affectedRows) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
                    },
                    function (callback) {
                        if (values.subjects) {
                            var subjects;
//                            if(typeof(values.subjects) =="string")
                            if(!Array.isArray(values.subjects)) subjects = [values.subjects];
                            else subjects = values.subjects;
                            async.each(subjects, function (item, callback_each) {
                                if(item == '') callback_each();
                                else {
                                    connection.query(sql.insert_subject, [values.email, item], function (err, result) {
                                        if (err) callback_each(err);
                                        else if (!result.affectedRows) callback_each(msg.err_access_no);
                                        else if (result.affectedRows == 1) callback_each(null);
                                        else callback_each(msg.err_unknown);
                                    });
                                }
                            }, function (err) {
                                if (err) {
                                    callback(err);
                                }
                                else callback(null);
                            });
                        }
                        else {
                            callback(null);
                        }
                    }
                ], function (err) {
                    custom.transaction_end(connection,callback,err,{});
                })
            })
        }
    })
}
//
//exports.join_tutor = function(values,callback){
//    var input = {};
//    var salt = Math.round((new Date().valueOf() * Math.random())) + '';
//    var cryp_pass = crypto.createHash('sha512').update(values.pw + salt).digest('hex');
//    var success = true;
//    input.email = values.email;
//    input.pw = cryp_pass;
//    input.salt = salt;
//    input.isTutor = 1;
//    input.last_name = values.last_name;
//    input.first_name = values.first_name;
//    input.gender = values.gender;
//    input.birthday = values.birthday;
//    input.address_si = values.address_si;
//    input.address_gu = values.address_gu;
//    input.photo = values.photo;
//    input.thumbnail = values.thumbnail;
//
////    input.subjects= values.subjests;
//    pool.getConnection(function(err,connection) {
//        if (err) {
//            console.error('err', err);
//            success = false;
//        }
//        connection.beginTransaction(function(err) {
//            console.log('2',err);
//            if (err) {
//                connection.rollback(function() {
//                });
//            }
//            async.series([
//                function (callback) {
//                    connection.query(sql.join_common, input, function (err, result) {
//                        console.log('3',err);
//                        console.log(result);
//                        if ((result.affectedRows) == 0 || !success) {
//                            console.error('err', err);
//                            success = false;
//                            connection.rollback(function() {
//                                callback(err);
//                            });
//                        } else {
////                console.log(rows);
//                            callback(null);
//                        }
//                    });
//                },
//                function (callback) {
//                    connection.query(sql.join_tutor, [values.email, null, null], function (err, result) {
//                        console.log('4',err);
//                        if ((result.affectedRows) == 0 || !success) {
//                            console.error('err', err);
//                            success = false;
//                            connection.rollback(function() {
//                                callback(err);
//                            });
//                        } else {
//                            callback(null);
//                        }
//                    });
//
//                },
//                function (callback) {
//                    if (values.subjects) {
//                        var subjects;
//                        if(typeof(values.subjects) =="string")
//                        {
//                            subjects = [values.subjects];
//                        }
//                        async.each(subjects, function (item, callback_each) {
//                            console.log(item);
//                            connection.query(sql.insert_subject, [values.email, item], function (err, result) {
//                                console.log('5',err);
//                                if (err || (result.affectedRows) == 0 || !success) {
//                                    connection.rollback(function() {
//                                        callback_each();
//                                    });
//                                } else {
//                                    callback_each();
//                                }
//                            });
//                        }, function (err) {
//                            if (err) {
//                                connection.rollback(function() {
//                                    callback(err);
//                                });
//                            }
//                            else callback(null);
//                        });
//                    }
//                    else {
//                        callback(null);
//                    }
//                }
//            ], function (err) {
//                if (err) {
//                    connection.rollback(function() {
//                        connection.release();
//                        callback(sql.fail);
//                    });
//                } else {
//                    connection.commit(function(err) {
//                        if (err) {
//                            connection.rollback(function() {
//                                connection.release();
//                            });
//                        } else {
//                            connection.release();
//                            callback(sql.success);
//                        }
//                    });
//                }
//            })
//        })
//    })
//}
//
//exports.join_tutee = function(values,callback){
//    var input = {};
//    var salt = Math.round((new Date().valueOf() * Math.random())) + '';
//    var cryp_pass = crypto.createHash('sha512').update(values.pw + salt).digest('hex');
//    var success = true;
//    input.email = values.email;
//    input.pw = cryp_pass;
//    input.salt = salt;
//    input.isTutor = 0;
//    input.last_name = values.last_name;
//    input.first_name = values.first_name;
//    input.gender = values.gender;
//    input.birthday = values.birthday;
//    input.address_si = values.address_si;
//    input.address_gu = values.address_gu;
//    input.photo = values.photo;
//    input.thumbnail = values.thumbnail;
////    input.subjects= values.subjests;
//    pool.getConnection(function(err,connection) {
//        if (err) {
//            console.error('err', err);
//            success = false;
//        }
//        connection.beginTransaction(function(err) {
//            console.log('2', err);
//            if (err) {
//                connection.rollback(function () {
//                });
//            }
//            async.series([
//                function (callback) {
//                    connection.query(sql.join_common, input, function (err, result) {
////                        console.log(err);
//                        if (err || (result.affectedRows) == 0 || !success) {
//                            connection.rollback(function() {
//                                callback(err);
//                            });
//                        } else {
//                            //                console.log(rows);
//                            callback(null);
//                        }
//                    });
//                },
//                function (callback) {
////                var school = values.school_name?values.school:"";
////                var grade = values.grade?values.grade:"";
//                    connection.query(sql.join_user, [values.email, values.school_name, values.grade], function (err, result) {
////                        console.log(err);
//                        if (err || (result.affectedRows) == 0 || !success) {
//                            connection.rollback(function() {
//                                callback(err);
//                            });
//                        } else {
//                            //                console.log(rows);
//                            callback(null);
//                        }
//                    });
//                }
//            ], function (err, result) {
//                if (err || result[0] || result[1]) {
//                    connection.rollback(function() {
//                        callback(sql.fail);
//                        connection.release();
//                    });
//                } else {
//                    callback(sql.success);
//                    connection.release();
//                }
//            });
//        });
//    })
//}


exports.join_tutee = function(values,files,callback){
    var input = {};
    var salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var cryp_pass = crypto.createHash('sha512').update(values.pw + salt).digest('hex');
    input.email = values.email;
    input.pw = cryp_pass;
    input.salt = salt;
    input.isTutor = 0;
    input.last_name = values.last_name;
    input.first_name = values.first_name;
    input.gender = values.gender;
    input.birthday = values.birthday;
    input.address_si = values.address_si;
    input.address_gu = values.address_gu;

    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err,callback);
        else{
            connection.beginTransaction(function(err) {
                async.waterfall([
                    function (callback) {
                        if(err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        photo.uploadfunc_join(files,values.email,function(err,photo_info){
                            if(err) callback(err);
                            else callback(null,photo_info);
                        })
                    },
                    function (photo_info,callback) {
                        if(photo_info != null){
                            input.photo = photo_info.photo;
                            input.thumbnail = photo_info.thumbnail;
                            input.photo_org_name = photo_info.originalname;
                        }
                        console.log(input);
                        connection.query(sql.join_common, input, function (err, result) {
                            if (err) callback(err);
                            else if (!result.affectedRows) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
                    },
                    function (callback) {
//                var school = values.school_name?values.school:"";
//                var grade = values.grade?values.grade:"";
                        connection.query(sql.join_user, [values.email, values.school_name, values.grade], function (err, result) {
                            if (err) callback(err);
                            else if (!result.affectedRows) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
                    }
                ], function (err) {
                    custom.transaction_end(connection,callback,err,{});
                });
            });
        }
    })
}


//exports.login = function(values,callback){
//
//
//
//}

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





exports.recommend_tutor = function(values,callback){
    //values = email, page
    var email = values.logined;
    var size = 20;
    var limit_num = (parseInt(values.page)-1)*size;

    //recommend user 1명 가져오기
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else {
            async.waterfall([
                function (callback) {
                    connection.query(sql.recommend_tutor, [email, email, email, email, limit_num, size], function (err, rows, result) {
                        if (err) callback(err);
                        else if (rows.length == 0) callback(null, rows);
                        else if (rows.length) callback(null, rows);
                        else callback(msg.err_unknown_no);
                    });
                },
                function (rows, callback) {
                    console.log(rows);
                    async.each(rows, function (item, callback_each) {
                        var target = item.email;
                        connection.query(sql.getSubject, [target], function (err, subjects, result) {
                            if (err) callback_each(err);
                            else {
                                item.subjects = custom.to_array(subjects, "subjects").subjects;
                                callback_each();
                            }
                        });
                    }, function (err) {
                        if (err) callback(err, rows);
                        else callback(null, rows);
                    });
                }], function (err, rows) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list: rows}, callback);
            });
        }
    });

    // console.log('req.body = '+req.body);
};






exports.recommend_user = function(values,callback){
    //values = email, page
    var email = values.logined;
    var limit_num = (values.page-1)*10;
    var size = 20;
    //recommend user 1명 가져오기
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else{
            connection.query(sql.recommend_user, [email, email, email, email,email, email, limit_num, size], function (err, rows, result) {
                connection.release();
                if (err) msg.err_return(err,callback);
                else if (rows.length == 0) msg.success_return({list:rows}, callback);
                else if (rows.length) msg.success_return({list:rows}, callback);
                else msg.err_return(msg.err_unknown_no,callback);
            });
        }
    });
};



exports.login = function(values,callback){
    var email = values.email;
    var pass = values.pw;
//    var cryp_pass = crypto.createHash('sha512').update(values.pw + salt).digest('hex');
//    var success = true;
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else{
            async.waterfall([
                function(callback){
                    connection.query(sql.login, [email], function (err, rows, result) {
                        if(err) callback(err);
                        else if(rows.length == 0) callback(msg.err_login_fail_no);
                        else callback(null,rows);
                    })
                },
                function(rows,callback){
                    var salt = rows[0].salt;
                    if(rows.length == 0 || rows[0].pw != crypto.createHash('sha512').update(pass + salt).digest('hex')){
                        callback(msg.err_login_fail_no);
                    }
                    else callback(null,rows[0].isTutor);
                },
                function(identity,callback) {
                    if (identity == 0) {
                        connection.query(sql.getUserInfo, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else if (rows.length == 0) callback(msg.err_login_fail_no);
                            else if (rows.length == 1) callback(null, rows[0]);
                            else callback(msg.err_unknown_no);
                        });
                    }
                    else if (identity == 1) {
                        connection.query(sql.getTutorInfo, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else if (rows.length == 0) callback(msg.err_login_fail_no);
                            else if (rows.length == 1) {
                                connection.query(sql.getSubject, [email], function (err, subjects, result) {
                                    if (err) callback(err);
                                    else if (rows.length == 0) callback(msg.err_login_fail_no);
                                    else if (rows.length == 1) {
                                        rows[0].subjects = custom.to_array(subjects, "subjects").subjects;
                                        callback(null, rows[0]);
                                    }
                                    else callback(msg.err_unknown_no);
                                });
                            }
                            else
                                callback(msg.err_unknown_no);
                        });
                    }
                    else callback(msg.err_unknown_no);
                }
            ],function(err,result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({"profile": result}, callback);
            });
        }
    });
};



exports.send_pw = function(value,callback){
    var email = value.email;
    var salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var cryp_pass = crypto.createHash('sha512').update(email + salt).digest('hex');

    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else{
            connection.beginTransaction(function(err) {
                async.waterfall([
                    function (callback){
                        console.log(1);
                        if (err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        connection.query(sql.reset_pw, [email,cryp_pass], function (err, result) {
                            if(err) callback(err);
                            else if(result.affectedRows == 0) callback(msg.err_unknown_no);
                            else if(result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function(callback){
                        mail.send_mail_pw(email,cryp_pass,function(err){
                            if(err) callback(err);
                            else callback(null);
                        });
                    }
                ],function(err){
                    custom.transaction_end(connection,callback,err,{});
                })
            })
        }
    });
};



exports.reset_pw_form = function(value,callback){
    var email = value.email;
    var key = value.key;

    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else{
            connection.beginTransaction(function(err) {
                async.series([
                    function (callback){
                        console.log(1);
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        connection.query(sql.reset_pw_form, [email, key], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 0) callback(msg.err_wrong_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function (callback) {
                        connection.query(sql.reset_pw_1, [email], function (err, result) {
                            if (err) callback(err);
                            else callback(null);
                        });
                    }
                ], function (err) {
                    custom.transaction_end(connection,callback,err,{});
                })
            });
        }
    });
};



exports.reset_pw = function(values, callback){
    console.log(values);
    var email = values.email;
    var salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var cryp_pass = crypto.createHash('sha512').update(values.pw + salt).digest('hex');

    pool.getConnection(function(err, connection){
        if(err) msg.err_return(err,callback);
        else{
            connection.beginTransaction(function(err) {
                async.series([
                    function (callback){
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        connection.query(sql.reset_pw_proc, [email], function (err, result) {
                            console.log(this.sql);
                            console.log(result);
                            if (err) callback(err);
                            else if (result.affectedRows == 0) callback(msg.err_wrong_access_no);
                            else if (result.affectedRows > 0 ) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    },
//                    function(callback){
//                        connection.query(sql.reset_pw_2, [email], function (err, result) {
//                            console.log(this.sql);
//                            console.log(result);
//                            if (err) callback(err)
//                            else callback(null);
//                        });
//                    },
                    function(callback){
                        connection.query(sql.member_pw_change, [cryp_pass, salt, email], function (err, result) {
                            console.log(this.sql);
                            console.log(result);
                            if (err) callback(err);
                            else if (result.affectedRows == 0) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callbcak(msg.err_unknown_no);
                        });
                    }],function(err){
                    custom.transaction_end(connection,callback,err,{});
                })
            })
        }
    });
};