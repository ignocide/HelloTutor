var mysql = require('./config');
var sql = require('./sqls');
var pool  = mysql.pool;
var async = require('async');
var custom = require('./etc');

var msg = require('./msg');
var photo = require('../public/photo');

exports.getTutor_info = function(values,callback){
    var email = values.email;
    var logined = values.logined;
    pool.getConnection(function(err,connection){
        if(err) console.error('err',err);
        else{
            async.parallel({
                "tutor" : function(callback){
                    connection.query(sql.tutor_simple_info, [email], function (err, rows, result) {
                        if (err) callback(err);
                        else if (rows.length == 1) {
                            var target = rows[0].email;
                            connection.query(sql.getSubject, [target], function (err, subjects, result) {
                                if (err) callback(err);
                                else{
                                    rows[0].subjects = custom.to_array(subjects, "subjects").subjects;
                                    callback(null, rows[0]);
                                }
                            });
                        }
                    });
                },
                "relation_me" :  function(callback){
                    connection.query(sql.relation_me_friend2, [email, logined], function(err, isFriend, result){
                        if (err) callback(err);
                        else{
                            var state;
                            console.log(isFriend);
                            if(isFriend.length == 0) state = 0;
                            else if(isFriend[0].agree == 'n' ) state = 1;
                            else if(isFriend[0].agree == 'y' ) state = 2;

                            connection.query(sql.relation_me_follow, [email,logined], function(err, isFollow, result){
                                if (err) callback(err);
                                else if(isFollow.length == 0) callback(msg.err_unknown_no);
                                else callback(null, {isFriend:state,isFollow:isFollow[0].isFollow});
                            });
                        }

                    });
                },
                "friend_list" : function(callback) {
                    connection.query(sql.friend_list, [email,0,3], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null,rows);
                    });
                },
                "follow_list" : function(callback) {
                    connection.query(sql.follow_list, [email,0,3], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null, rows);
                    })
                },
                "board" : function(callback) {
                    connection.query(sql.board_list, [logined,email, 0,1], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null, rows[0]);
                    });
                },
                "courses" : function(callback) {
                    connection.query(sql.course_list, [email], function (err, rows, result){
                        if (err) callback(err);
                        else callback(null, rows);
                    });
                }
            },function(err, result){
                connection.release();
                if(err) msg.err_return(err, callback);
                else msg.success_return(result,callback);
            });
        }
    });
};

exports.getTutor_detail = function(values,callback){
    var email = values.email;
    var logined = values.logined;

    pool.getConnection(function(err,connection){
        if(err) console.error('err',err);
        else {
            async.parallel({
                    "tutor" : function(callback){
                        connection.query(sql.tutor_detail, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else if (rows.length == 1) {
                                var target = rows[0].email;
                                connection.query(sql.getSubject, [target], function (err, subjects, result) {
                                    if (err) callback(err);
                                    else{
                                        rows[0].subjects = custom.to_array(subjects, "subjects").subjects;
                                        callback(null, rows[0]);
                                    }
                                });
                            }
                        });
                    },
                    "tutor_career": function (callback) {
                        connection.query(sql.tutor_career, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else callback(null, rows);
                        });
                    },
                    "relation_me" :  function(callback){
                        connection.query(sql.relation_me_friend2, [email, logined], function(err, isFriend, result){
                            if (err) callback(err);
                            else{
                                var state;
                                if(isFriend.length == 0) state = 0;
                                else if(isFriend[0].agree == 'n' ) state = 1;
                                else if(isFriend[0].agree == 'y' ) state = 2;

                                connection.query(sql.relation_me_follow, [email,logined], function(err, isFollow, result){
                                    if (err) callback(err);
                                    else if(isFollow.length == 0) callback(msg.err_unknown_no);
                                    else callback(null, {isFriend:state,isFollow:isFollow[0].isFollow});
                                });
                            }

                        });
                    },
                    "URL":function(callback){
                        connection.query(sql.tutor_url, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else callback(null, rows);
                        });
                    }
                },
                function (err, result) {
                    connection.release();
                    if(err) msg.err_return(err, callback);
                    else msg.success_return(result,callback);
                });
        }
    });
};

exports.write_career = function(values, callback) {
    var inputs = {};
    inputs.email = values.logined;
    inputs.fromdate = values.fromdate;
    inputs.todate = values.todate;
    inputs.title = values.title;
    inputs.content = values.content;

    pool.getConnection(function(err, connection){
        connection.query(sql.write_career, values , function(err, result){
            connection.release();
            if(err) msg.err_return(err, callback);
            else if(result.affectedRows == 1) msg.success_return(result,callback);
            else msg.err_return(msg.err_unknown_no.callback);
        });
    });
};

exports.modify_career = function(values, callback) {
    pool.getConnection(function(err, connection){
        connection.query(sql.write_career, [values.fromdate,values.todate,values.title,values.content,value.num,values.logined] , function(err, result){
            connection.release();
            if(err) msg.err_return(err, callback);
            else if(result.affectedRows == 1) msg.success_return(result,callback);
            else msg.err_return(msg.err_unknown_no.callback);
        });
    });
};


exports.del_career = function(values, callback) {
    pool.getConnection(function(err, connection){
        connection.query(sql.del_career, [value.num,values.logined] , function(err, result){
            connection.release();
            if(err) msg.err_return(err, callback);
            else if(result.affectedRows == 1) msg.success_return(result,callback);
            else msg.err_return(msg.err_unknown_no.callback);
        });
    });
};

exports.write_url = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.title = values.title;
    inputs.url = values.url;

    pool.getConnection(function(err, connection){
        connection.query(sql.write_url, inputs , function(err, result){
            connection.release();
            if(err) msg.err_return(err, callback);
            else if(result.affectedRows == 1) msg.success_return(result,callback);
            else msg.err_return(msg.err_unknown_no.callback);
        });
    });
};

exports.modify_url = function(values,callback){
    pool.getConnection(function(err, connection){
        connection.query(sql.write_url, [values.title, values.url, values.num,values.email] , function(err, result){
            connection.release();
            if(err) msg.err_return(err, callback);
            else if(result.affectedRows == 1) msg.success_return(result,callback);
            else msg.err_return(msg.err_unknown_no.callback);
        });
    });
};

exports.del_url = function(values,callback){
    pool.getConnection(function(err, connection){
        connection.query(sql.write_url, inputs , function(err, result){
            connection.release();
            if(err) msg.err_return(err, callback);
            else if(result.affectedRows == 1) msg.success_return(result,callback);
            else msg.err_return(msg.err_unknown_no.callback);
        });
    });
};


exports.modify_subject = function(values, callback){
    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.series([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        connection.query(sql.delete_subject, [values.logined], function (err, result) {
                            if (err) callback(err);
                            else callback(null);
                        })
                    },
                    function (callback) {
                        if (values.subjects) {
                            var subjects;
//                            if(typeof(values.subjects) =="string")
                            if (!Array.isArray(values.subjects)) subjects = [values.subjects];
                            else subjects = values.subjects;
                            async.each(subjects, function (item, callback_each) {
                                connection.query(sql.insert_subject, [values.email, item], function (err, result) {
                                    if (err) callback_each(err);
                                    else if (!result.affectedRows) callback_each(msg.err_access_no);
                                    else if (result.affectedRows == 1) callback_each(null);
                                    else callback_each(msg.err_unknown);
                                });
                            }, function (err) {
                                if (err) callback(err);
                                else callback(null);
                            });
                        }
                        else callback(null);
                    }
                ], function (err) {
                    custom.transaction_end(connection, callback, err, {});
                });
            });
        }
    });
};




exports.modify_tutor = function(values,files, callback){
    var input = {};
    input.photo = null;
    input.thumbnail = null;
    input.photo_org_name = null;

    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.waterfall([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        connection.query(sql.modify_tutor, [values.academic,values.etc,values.logined], function (err, result) {
                            if (err) callback(err);
                            else if (!result.affectedRows) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
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
                        connection.query(sql.modify_member, [values.address_si,values.address_gu,input.thumbnail,input.photo,input.photo_org_name,values.logined], function (err, result) {
                            if (err) callback(err);
                            else if (!result.affectedRows) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
                    }
                ], function (err) {
                    custom.transaction_end(connection, callback, err, {});
                });
            });
        }
    });
};




















exports.tutee_simple = function(values, callback){
    var email = values.email;
    var success = true;
    var logined = values.logined;

    pool.getConnection(function(err, connection){
        if(err) console.log('err',err);
        async.parallel({
                "user" : function(callback) {
                    connection.query(sql.user_info, [email], function(err, rows, result){
                        if(err){
                            console.error('err',err);
                            success = false;
                        }
                        callback(null, rows[0]);
                    });
                },
                "relation_me" :  function(callback){
                    connection.query(sql.relation_me_friend2, [email, logined], function(err, isFriend, result){
                        if (err) callback(err);
                        else {
                            var state;
                            if(isFriend.length == 0) state = 0;
                            else if(isFriend[0].agree == 'n' ) state = 1;
                            else if(isFriend[0].agree == 'y' ) state = 2;
                            callback(null, state);
                        }
                    });
                },
                "friend_list" : function(callback) {
                    connection.query(sql.friend_list, [email,0,6], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null,rows);
                    });
                },
                "board" : function(callback) {
                    connection.query(sql.board_list, [logined,email, 0,1], function (err, rows, result) {
                        if (err) callback(err);
                        else {
                            console.log(rows);
                            callback(null, rows[0]);
                        }
                    });
                }
            },
            function(err, result){
                connection.release();
                if(err) msg.err_return(err, callback);
                else msg.success_return(result,callback);
            });
    });
}

exports.modify_user_info = function(values, callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.photo = values.photo;
    inputs.address_si = values.address_si;
    inputs.address_gu = values.address_gu;
    inputs.about_me = values.about_me;
    inputs.school_name = values.school_name;
    inputs.school_grade = values.school_grade;
    inputs.grade = values.grade;
    console.log(inputs);

    pool.getConnection(function(err, connection){
        if(err) console.error('err', err);
        var message;
        async.waterfall([
            function(callback){
                connection.query(sql2.modify_user_info, [values.photo, values.address_si, values.address_gu, values.about_me, values.logined], function(err, result){
                    console.log('result1', result);
                    if(err || !result.affectedRows){
                        console.error('err1', err);
                        message = sql2.fail;
                    } else result = sql2.success;
                    callback(null, result);
                });
            },
            function(arg1, callback){
                connection.query(sql2.modify_user_school, [values.school_name, values.grade, values.logined], function(err, result){
                    console.log('result2', result);
                    if(err || !result.affectedRows){
                        console.error('err2', err);
                        message = sql2.fail;
                    } else result = sql2.success;
                    callback(null, result);
                });
            }
        ],function(err, result){
            connection.release();
            callback(result);


        });
    });
}





exports.modify_stu = function(values,files, callback){
    var input = {};
    input.photo = null;
    input.thumbnail = null;
    input.photo_org_name = null;

    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.waterfall([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        connection.query(sql.modify_stu, [values.school_name,values.grade,values.logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows != 1) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
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
                        connection.query(sql.modify_member, [values.address_si,values.address_gu,input.thumbnail,input.photo,input.photo_org_name,values.logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows != 1) callback(msg.err_access_no);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown);
                        });
                    }
                ], function (err) {
                    custom.transaction_end(connection, callback, err, {});
                });
            });
        }
    });
};




exports.school_search = function(values, callback){
    var input = {};
    input.keyword = values.keyword;

    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.school_search, ['%'+values.keyword+'%'], function (err, rows,result) {
                connection.release();
                if (err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    });
};



exports.check_email = function(values, callback){

    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.check_email, [values.email], function (err, rows,result) {
                connection.release();
                if (err) msg.err_return(err,callback);
                else msg.success_return(rows[0],callback);
            });
        }
    });
};





















//
//
//
//
//
//
//
//
//
//
//exports.modify_tutor = function(values,callback){
//    // console.log("db들어옴");
//    var inputs = {};
//    inputs.email = values.logined;
//    inputs.last_name  = values.last_name;
//    inputs.first_name = values.first_name;
//    inputs.photo = values.photo;
//    inputs.address_si = values.address_si;
//    inputs.address_gu = values.address_gu;
//    inputs.academic = values.academic;
//    inputs.etc = values.etc;
//    inputs.num = values.num; // url 번호
//    inputs.title = values.title; // url 제목
//    inputs.url = values.url;
//
//    console.log(inputs);
//    pool.getConnection(function(err,connection) {
//        async.waterfall([
//            function(callback) {
//                connection.query(sql2.modify_tutor,[values.last_name, values.first_name, values.photo, values.address_si, values.address_gu, values.logined], function (err, result) {
//                    console.log('result1',result);
//                    if (err || !result.affectedRows) {
//                        console.error('err', err);
//                        result = sql2.fail
//
//                    } else result = sql2.success;
//                    callback(null, result);
//                });
//            },
//            function(arg1, callback) {
//                connection.query(sql2.modify_tutor_info,[values.academic, values.etc, values.logined], function (err, result) {
//                    // console.log(result);
//                    console.log('result2',result);
//                    if (err || !result.affectedRows) {
//                        console.error('err', err);
//                        result = sql2.fail
//
//                    } else result = sql2.success;
//                    callback(null, result);
//                });
//            },
//            function(arg2, callback){
//                connection.query(sql2.modify_tutor_url,[values.url, values.title, values.logined, values.num], function (err, result) {
//                    console.log('result3',result);
//
//                    if (err || !result.affectedRows) {
//                        console.error('err', err);
//                        result = sql2.fail
//
//                    } else result = sql2.success;
//                    callback(null, result);
//                });
//            }
//        ],function(err, result){
//            connection.release();
//            callback(result);
//        });
//    });
//}