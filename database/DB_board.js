var mysql = require('./config');
var sql = require('./sqls');
var pool  = mysql.pool;
var _ = require('lodash');
var async = require('async');
var photo = require('../public/photo');
var fse = require('fs-extra');
var path = require('path');
var msg = require('./msg');
var custom = require('./etc');

exports.main = function(values,callback){
    //values = email, page
    var email = values.logined;
    var page = values.page;
    var limit_num = (values.page-1)*10;
    var size = 2;
    var send_message = {};
    send_message.recommend = [ ];
    //recommend user 1명 가져오기

    var success = true;
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else {
            async.parallel({
//            function(callback){
//                if(page == 1) {
//                    connection.query(sql.recommend_user, [email, email, email, email, email, 0, size], function (err, rows, result) {
//                        if (err) {
//                            console.error('err', err);
//                            success = false;
//                        }
//                        console.log(rows);
//                        callback(null, rows[0]);
//                    });
//                }
//            },
                "recommends": function (callback) {
                    if (page == 1) {
                        //사용자,사용자,사용자,사용자,0,2
                        connection.query(sql.recommend_tutor, [email, email, email, email, 0, size], function (err, rows, result) {
                            if (err) callback(err);
                            else if (rows.length == 0) callback(null,[]);
                            else if (rows.length) {
                                async.each(rows,function(item,callback_each) {
                                    connection.query(sql.getSubject, [item.email], function (err, subjects, result) {
                                        console.log(1);
                                        if (err) callback_each(err);
                                        else if (rows.length == 0) callback_each(null);
                                        else if (rows.length) {
                                            console.log(subjects);
                                            item.subjects = custom.to_array(subjects, "subjects").subjects;
                                            console.log(item.subjects);
                                            callback_each(null);
                                        }
                                        else callback_each(msg.err_unknown);
                                    })
                                },function(err){
                                        if(err) callback(err);
                                        else callback(null,rows);
                                });
                            }
                            else callback(msg.err_unknown);
                        });
                    } else callback(null,[]);
                },
                "state": function (callback) {
                    if (page == 1) {
                        connection.query(sql.relation_alram, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else callback(null, rows);
                        });
                    } else callback(null,[]);
                },
//            사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,페이지
                "boards": function (callback) {
                    connection.query(sql.getFeed, [email, email, email, email, email, limit_num], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null, rows);
                    })
                }
            }, function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else msg.success_return(result,callback);
            });
        }
    });

    // console.log('req.body = '+req.body);
};


exports.main2 = function(values,callback){
    //values = email, page
    var email = values.logined;
    var page = values.page;
    var limit_num = (values.page-1)*10;
    var size = 2;
    var send_message = {};
    send_message.recommend = [ ];
    //recommend user 1명 가져오기

    var success = true;
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else {
            async.parallel({
//            function(callback){
//                if(page == 1) {
//                    connection.query(sql.recommend_user, [email, email, email, email, email, 0, size], function (err, rows, result) {
//                        if (err) {
//                            console.error('err', err);
//                            success = false;
//                        }
//                        console.log(rows);
//                        callback(null, rows[0]);
//                    });
//                }
//            },
                "recommends": function (callback) {
                    if (page == 1) {
                        //사용자,사용자,사용자,사용자,0,2
                        connection.query(sql.recommend_tutor, [email, email, email, email, 0, size], function (err, rows, result) {
                            if (err) callback(err);
                            else if (rows.length == 0) callback(null,[]);
                            else if (rows.length) {
                                async.each(rows,function(item,callback_each) {
                                    connection.query(sql.getSubject, [item.email], function (err, subjects, result) {
                                        console.log(1);
                                        if (err) callback_each(err);
                                        else if (rows.length == 0) callback_each(null);
                                        else if (rows.length) {
                                            console.log(subjects);
                                            item.subjects = custom.to_array(subjects, "subjects").subjects;
                                            console.log(item.subjects);
                                            callback_each(null);
                                        }
                                        else callback_each(msg.err_unknown);
                                    })
                                },function(err){
                                    if(err) callback(err);
                                    else callback(null,rows);
                                });
                            }
                            else callback(msg.err_unknown);
                        });
                    } else callback(null,[]);
                },
                "state": function (callback) {
                    if (page == 1) {
                        connection.query(sql.relation_alram, [email], function (err, rows, result) {
                            if (err) callback(err);
                            else callback(null, rows);
                        });
                    } else callback(null,[]);
                },
//            사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,페이지
                "boards": function (callback) {
                    connection.query(sql.getFeed2, [email, email, email, email, email, limit_num], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null, rows);
                    })
                }
            }, function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else msg.success_return(result,callback);
            });
        }
    });

    // console.log('req.body = '+req.body);
};


exports.list = function(values,callback){
    var pageSize = 100;
    var limit_num = (values.page-1)*pageSize;
    var target = values.email;
    var email = values.logined;
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else{
            connection.query(sql.board_list,[email,target, limit_num,pageSize],function(err,rows,result){
                console.log(this.sql);
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    });
};


exports.read = function(values,callback){
    var num = values.num;
    var email = values.logined;
    pool.getConnection(function(err,connection){
        if(err) msg.err_return(err,callback);
        else {
            async.parallel({
                "board": function (callback) {
                    connection.query(sql.read_article, [email, num], function (err, rows, result) {
                        if (err) callback(err);
                        else if(rows.length == 1){
                            connection.query(sql.read_photo, [num], function (err, photos, result) {
                                console.log(this.sql)
                                if (err) callback(err);
                                else{
                                    console.log(photos);
                                    console.log(rows);
                                    rows[0].photo = custom.to_array(photos, "photo").photo;
                                    callback(null, rows[0]);
                                }
                            });
                        }
                        else callback(msg.err_no_reulst_no);
                    });
                },
                "board_comments": function (callback) {
                    connection.query(sql.read_comments, [num], function (err, rows, result) {
                        if (err) callback(err);
                        else callback(null, rows);
                    });
                }
            }, function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else msg.success_return(result,callback);
            });
        }
    });
};


//exports.write = function(values,files,callback){
//    console.log("db들어옴")
//    var inputs = {};
//    inputs.email = values.logined;
//    inputs.title = values.title;
//    inputs.content = values.content;
//    inputs.url1 = values.url1;
//    inputs.url2 = values.url2;
//    pool.getConnection(function(err,connection) {
//        connection.beginTransaction(function(err) {
//            if (err) { throw err; }
//            connection.query(sql.write_board, /*[values.logined,values.title,values.content,values.url1,values.url2]*/inputs, function (err, result) {
//                console.log(err);
//                if (err || !result.affectedRows) {
//                    connection.rollback(function() {
//                        connection.release();
//                    });
//                }
//                console.log(result);
//                var target = result.insertId+"";
//                photo.uploadfunc_board(target,files,function(err,photos){
//                    console.log(photos);
//                    if(err){
//                        connection.rollback(function() {
//                            fse.remove(path.join(__dirname,'..','public','photo','board',target),function(){});
//                            connection.release();
//                        });
//                    } else {
//                        connection.query(sql.write_board_thumbnail,[photos.thumbnail,target,values.logined], function (err, result) {
//                            console.log(err);
//                            if (err || !result.affectedRows) {
//                                connection.rollback(function () {
//                                    fse.remove(path.join(__dirname,'..','public','photo','board',target),function(){});
//                                    connection.release();
//                                });
//                            } else {
//                                async.each(photos.arr,function(item,callback_each){
//                                    connection.query(sql.board_photo_insert,[target,target,item], function (err, result) {
//                                        console.log(this.sql);
//                                        if(err) console.log(err);
//                                        callback_each();
//                                    });
//                                },function(err){
//                                    if (err) {
//                                        connection.rollback(function () {
//                                            fse.remove(path.join(__dirname,'..','public','photo','board',target),function(){});
//                                            connection.release();
//                                        });
//                                    }//if
//                                    else{
//                                        connection.commit(function(err) {
//                                            if (err) {
//                                                connection.rollback(function() {
//                                                    fse.remove(path.join(__dirname,'..','public','photo','board',target),function(){});
//                                                    connection.release();
//                                                });
//                                            } else{
//                                                connection.release();
//                                                callback(sql.success);
//                                            }
//                                        })
//                                    }//else
//                                });//each
//                            }//else
//                        });//write_board_thumbnail
//                    }
//                });//photo
//            });//write_board
//        });//transaction
//    })//getConnection
//};//function

exports.write = function(values,files,callback){
    console.log("db들어옴")
    var inputs = {};
    inputs.email = values.logined;
    inputs.title = values.title;
    inputs.content = values.content;
    inputs.url1 = values.url1;
    inputs.url2 = values.url2;
    var target;
    pool.getConnection(function(err,connection) {
        if(err) msg.err_return(err,callback);
        else{
            connection.beginTransaction(function(err) {
                if(err) msg.err_return(err,callback);
                else{
                    async.waterfall([
                        function(callback){
                            connection.query(sql.write_board, /*[values.logined,values.title,values.content,values.url1,values.url2]*/inputs, function (err, result) {
                                if (err) callback(err);
                                else if (result.insertId == undefined || !result.affectedRows) callback(msg.err_unknown);
                                else if (result.insertId){
                                    target =  result.insertId+"";
                                    console.log("1",result);
                                    callback(null);
                                }
                                else callback(msg.err_unknown);
                            })
                        },
                        function(callback){
                            photo.uploadfunc_board(target,files,function(err,photo_info){
                                if (err) callback(err);
                                else callback(null,photo_info);
                            })
                        },
                        function(photo_info,callback){
                            if(photo_info != null) {
                                connection.query(sql.write_board_thumbnail, [photo_info.thumbnail, target, values.logined], function (err, result) {

                                    if (err) callback(err);
                                    else if (result.affectedRows == 0) callback(msg.err_access_no);
                                    else callback(null, photo_info);
                                });
                            }
                            else callback(null,null);
                        },
                        function(photo_info,callback) {
                            if (photo_info != null) {
                                async.each(photo_info.photo, function (item, callback_each) {
                                    connection.query(sql.board_photo_insert, [target, target, item.photo_path, item.originalname], function (err, result) {
                                        if (err) callback_each(err);
                                        else if (result.affectedRows == 0) callback_each(msg.err_access_no);
                                        else callback_each();
                                    });
                                }, function (err) {
                                    if (err) callback(err);
                                    else callback(null);
                                });
                            }
                            else callback(null,null);
                        }
                    ],function(err){
                        if (err) {
                            connection.rollback(function () {
                                if(target != null)  fse.remove(path.join(__dirname,'..','public','photo','board',target),function(){});
                                msg.err_return(err,callback);
                                connection.release();
                            });
                        }//if
                        else{
                            connection.commit(function(err) {
                                if (err) {
                                    connection.rollback(function() {
                                        if(target != null)  fse.remove(path.join(__dirname,'..','public','photo','board',target),function(){});
                                        msg.err_return(err,callback);
                                        connection.release();
                                    });
                                } else{
                                    connection.release();
                                    msg.success_return({},callback);
                                }
                            })
                        }
                    });
                }
            });//transaction
        }
    })//getConnection
};//function

//
//exports.write = function(values,files,callback){
//    console.log("db들어옴")
//    var inputs = {};
//    inputs.email = values.logined;
//    inputs.title = values.title;
//    inputs.content = values.content;
//    inputs.url1 = values.url1;
//    inputs.url2 = values.url2;
//    pool.getConnection(function(err,connection) {
//        connection.beginTransaction(function(err) {
//            if (err) { throw err; }
//            connection.query(sql.write_board, /*[values.logined,values.title,values.content,values.url1,values.url2]*/inputs, function (err, result) {
//                console.log(err);
//                if (err || !result.affectedRows) {
//                    connection.rollback(function() {
//                        connection.release();
//                    });
//                }
//                console.log(result);
//                var target = result.insertId+"";
//                photo.uploadfunc_board(target,files,function(err,result){
//                    if(err){
//                        connection.rollback(function() {
//                            connection.release();
//                        });
//                    } else {
//                        connection.query(sql.write_board_thumbnail,[result.thumbnail,target,values.logined], function (err, result) {
//                            console.log(err);
//                            if (err || !result.affectedRows) {
//                                connection.rollback(function () {
//                                    connection.release();
//                                });
//                            } else {
//                                async.each(result.arr,function(item,callback_each){
//                                    connection.query(sql.board_photo_insert,[item,target,target], function (err, result) {
//                                        console.log(err);
//                                        callback_each();
//                                    });
//                                },function(err){
//                                    if (err) {
//                                        connection.rollback(function () {
//                                            connection.release();
//                                        });
//                                    }
//                                    else{
//                                        connection.commit(function(err) {
//                                            if (err) {
//                                                connection.rollback(function() {
//                                                    connection.release();
//                                                });
//                                            } else{
//                                                connection.release();
//                                                callback(sql.success);
//                                            }
//                                        })
//                                    }
//                                })
//                            );
//                            }
//                        });
//                    }
//                });
//            });
//        });
//    })
//};
//

//
//
//exports.write = function(values,callback){
//    console.log("db들어옴")
//    var inputs = {};
//    inputs.email = values.logined;
//    inputs.title = values.title;
//    inputs.content = values.content;
//    inputs.url1 = values.url1;
//    inputs.url2 = values.url2;
//
//    console.log(inputs);
//    pool.getConnection(function(err,connection) {
//
//        connection.query(sql.insert_board, /*[values.logined,values.title,values.content,values.url1,values.url2]*/inputs, function (err, result) {
//            console.log(result);
//            var message
//            if (err || !result.affectedRows) {
//                console.error('err', err);
//                message = sql.fail
//
//            } else message = sql.success;
//
//            connection.release();
//            callback(message);
//        });
//    });
//}


exports.modify = function(values,files,callback){
    console.log("db들어옴")
    var inputs = {};
    inputs.num = values.num;
    inputs.email = values.logined;
    inputs.title = values.title;
    inputs.content = values.content;
    inputs.url1 = values.url1;
    inputs.url2 = values.url2;

//    console.log(inputs);
    pool.getConnection(function(err,connection) {
        if(err) msg.err_return(err,callback);
        else {
            connection.beginTransaction(function (err) {
                async.waterfall([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        photo.uploadfunc_board(values.num+"", files, function (err, photo_info) {
                            if (err) callback(err);
                            else callback(null, photo_info);
                        });
                    },
                    function (photo_info, callback) {
                        var thumbnail = photo_info == null ? null : photo_info.thumbnail;
                        connection.query(sql.modify_board, [values.title, values.content, values.url1, values.url2, thumbnail, values.num, values.logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 0) callback(msg.err_access_no);
                            else callback(null, photo_info);
                        });
                    },
                    function (photo_info, callback) {
                        connection.query(sql.del_photo, [values.num], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 0) callback(msg.err_access_no);
                            else callback(null, photo_info);
                        });
                    },
                    function (photo_info, callback) {
                        if (photo_info != null) {
                            async.each(photo_info.photo, function (item, callback_each) {
                                connection.query(sql.board_photo_insert, [values.num, values.num, item.photo_path, item.originalname], function (err, result) {
                                    if (err) callback_each(err);
                                    else if (result.affectedRows == 0) callback_each(msg.err_access_no);
                                    else callback_each();
                                });
                            }, function (err) {
                                if (err) callback(err);
                                else callback(null);
                            });
                        }
                        else callback(null);
                    }
                ], function (err) {
                    custom.transaction_end(connection,callback,err,{});
                })
            })
        }
    });
}


exports.delete = function(values,callback){
    var inputs = {};
    inputs.num = values.num;
    inputs.email = values.logined;

    console.log(inputs);
    pool.getConnection(function(err,connection) {

        connection.query(sql.delete_board, [values.num,values.logined], function (err, result) {
            connection.release();
            if (err) msg.err_return(err,callback);
            else if (result.insertId == undefined || !result.affectedRows) msg.err_return(msg.err_access_no,callback);
            else if (result.insertId) msg.success_return({},callback);
            else msg.err_return(msg.err_unknown,callback);
        });
    });
}



exports.write_comment = function(values,callback){
    console.log("db들어옴")

//    console.log(inputs);
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.parallel([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        connection.query(sql.insert_comment, [values.grp, values.grp, values.logined, values.content], function (err, result) {
                            if (err) callback(err);
                            else if (result.insertId == undefined || !result.affectedRows) callback(msg.err_access_no);
                            else if (result.insertId) callback(null);
                            else callback(msg.err_unknown);
                        });
                    },
                    function(callback){
                        connection.query(sql.board_cmt_alaram_req, [values.grp,values.logined,values.grp], function(err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    }
                ],function(err){
                    custom.transaction_end(connection,callback,err,{});
                })
            })
        }
    });
}


exports.modify_comment = function(values,callback){
    console.log("db들어옴")
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;
    inputs.grp_num = values.grp_num;
    inputs.content = values.content;

    pool.getConnection(function(err,connection) {
        connection.query(sql.modify_comment,[values.content,values.grp,values.grp_num,values.logined], function (err, result) {
            connection.release();
            if (err) msg.err_return(err,callback);
            else if (result.insertId == undefined || !result.affectedRows) msg.err_return(msg.err_access_no,callback);
            else if (result.insertId) msg.success_return({},callback);
            else msg.err_return(msg.err_unknown,callback);
        });
    });
}


exports.delete_comment = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;
    inputs.grp_num = values.grp_num;
    inputs.content = values.content;

    pool.getConnection(function(err,connection) {

        connection.query(sql.delete_comment,[values.grp,values.grp_num,values.logined], function (err, result) {
            connection.release();
            if (err) msg.err_return(err,callback);
            else if (result.affectedRows == undefined || !result.affectedRows) msg.err_return(msg.err_access_no,callback);
            else if (result.affectedRows) msg.success_return({},callback);
            else msg.err_return(msg.err_unknown,callback);
        });
    });
}


exports.good_req = function(values,callback){

    var input = {};
    input.grp = values.grp;
    input.email =values.logined;
    pool.getConnection(function(err,connection) {

        connection.query(sql.board_good_req,input, function (err, result) {
            connection.release();
            if (err) msg.err_return(err,callback);
            else if (result.affectedRows == undefined || !result.affectedRows) msg.err_return(msg.err_access_no,callback);
            else if (result.affectedRows) msg.success_return({},callback);
            else msg.err_return(msg.err_unknown,callback);
        });
    });
}


exports.good_del = function(values,callback){
    console.log(values);
    pool.getConnection(function(err,connection) {
        connection.query(sql.board_good_del,[values.grp,values.logined], function (err, result) {
            console.log(this.sql);
            connection.release();
            if (err) msg.err_return(err,callback);
            else if (result.affectedRows == undefined || !result.affectedRows) msg.err_return(msg.err_access_no,callback);
            else if (result.affectedRows) msg.success_return({},callback);
            else msg.err_return(msg.err_unknown,callback);
        });
    });
}

