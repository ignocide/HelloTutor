var mysql = require('./config');
var sql = require('./sqls');
var pool  = mysql.pool;
var async = require('async');
var msg  = require('./msg');
var photo = require('../public/photo');
var fse = require('fs-extra');
var path = require('path');
var fs = require('fs');
var custom = require('./etc');

exports.course_detail = function(values, callback){
    var logined = values.logined;
    var num = values.num;

    pool.getConnection(function(err, connection){
        if(err)    msg.err_return(err,callback);
        else {
            async.parallel({
                "course": function (callback) {
                    connection.query(sql.course_info, [num], function (err, rows, result) {
                        console.log(rows);
                        if (err) callback(err);
                        else if (!rows.length) callback({errno: 1000000});
                        else {
                            connection.query(sql.course_subjects, [num], function (err, subjects, result) {
                                if (err) callback(err);
                                else{
                                    console.log(subjects);
                                    rows[0].subjects = custom.to_array(subjects, "subjects").subjects;
                                    callback(null, rows[0]);
                                }
                            });
                        }
                    });
                },
                "review": function (callback) {
                    connection.query(sql.review_list, [num, logined], function (err, rows, result) {
                        console.log(rows);
                        if (err) callback(err);
                        else callback(null, rows);
                    });
                }
            }, function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else msg.success_return(result, callback);
            });
        }
    });
}


exports.write = function(values,files,callback) {
    console.log("db들어옴")
    var course = {};
    course.email = values.logined;
    course.title = values.title;
    course.content = values.content;
    course.one_line = values.one_line;
//    course.photo = values.photo;
//    course.thumbnail = values.thumbnail;
//    course.photo_org_name = values.photo_org_name;

    var subjects = Array.isArray(values.subjects)?values.subjects:[];

    console.log(subjects);
    console.log(course);

    pool.getConnection(function (err, connection) {
        if(err) msg.err_return(err,callback);
        else {
            //transaction start
            connection.beginTransaction(function (err) {
                async.waterfall([
                    //강의 작성
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        photo.uploadfunc_course2(files, function (thumbnail, origin, photo_org_name) {
                            course.photo = origin;
                            course.thumbnail = thumbnail;
                            course.photo_org_name = photo_org_name;
                            connection.query(sql.course_write, course, function (err, result) {
                                if (err || result.affectedRows == 0)    callback(err);
                                else    callback(null, result.insertId);
                            })
                        })
                    },
                    //강의의 과목 작성
                    function (target, callback) {
                        console.log(subjects);
                        async.each(subjects, function (item, callback_each) {
                            console.log(item);
                            connection.query(sql.course_subject, [target, item], function (err, result) {
                                if (err || (result.affectedRows) == 0)  callback_each(err);
                                else    callback_each();
                            })
                        }, function (err) {
                            if (err) callback(err);
                            else callback(null);
                        })
                    }
                ], function (err) {
                    custom.transaction_end(connection,callback,err,{});
                })
            })
        }
    })
}
//
//exports.write = function(values,callback) {
//    console.log("db들어옴")
//    var course = {};
//    course.email = values.logined;
//    course.title = values.title;
//    course.content = values.content;
//    course.one_line = values.one_line;
//    course.photo = values.photo;
//    course.thumbnail = values.thumbnail;
//    course.photo_org_name = values.photo_org_name;
//
//    var subjects = values.subjects;
//
//    console.log(subjects);
//    console.log(course);
//    var success = true;
//
//    pool.getConnection(function (err, connection) {
//
//        connection.beginTransaction(function (err) {
////            async.waterfall({})
//            if (err) throw new Error("err",err);
//            connection.query(sql.course_write, course, function (err, result) {
//                if (err) {
//                    connection.rollback(function () {
//                        connection.release();
//                        msg.err_return(err,callback);
//                    });
//                }
//                else{
//                    var target_num = result.insertId;
//                    async.each(subjects, function (item, callback_each) {
//                        console.log(item);
//                        connection.query(sql.course_subject, [target_num, item], function (err, result) {
//                            if (err || (result.affectedRows) == 0) {
//                                console.log(err);
//                                connection.rollback(function () {
//                                    success = false;
//                                    throw err;
//                                });
//                            }
//                            callback_each();
//
//                        })
//
//                    }, function (err) {
//                        if (err) {
//                            success = false;
//                            console.error('err', err);
//                        }
//                        else {
//                            connection.commit(function (err) {
//                                if (err) {
//                                    connection.rollback(function () {
//                                        success = false;
//                                        throw err;
//                                    });
//                                }
//                                connection.release();
//                                console.log('success!');
//                                if (success) {
//                                    callback(sql.success);
//                                } else
//                                    callback(sql.fail);
//                            });
//                        }
//
//                    });
//                }
//            });
//
//        });
//    });
//}







exports.modify = function(values,files,callback) {
    var course = {};
    course.num = values.num;
    course.email = values.logined;
    course.title = values.title;
    course.content = values.content;
    course.one_line = values.one_line;
    course.photo = values.photo;
    course.thumbnail = values.thumbnail;
    course.photo_org_name = values.photo_org_name;


    var subjects = Array.isArray(values.subjects)?values.subjects:[];
//    console.log(subjects);
//    console.log([values.title,values.content,values.one_line,values.photo,values.thumbnail,values.photo_org_name,parseInt(values.num)]);

    pool.getConnection(function (err, connection) {
        if(err)    msg.err_return(err,callback);
        {
            connection.beginTransaction(function (err) {
                async.waterfall([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        connection.query(sql.course_getPhotos, [values.num, values.logined], function (err, rows, result) {
                            if (err) callback(err);
                            else if (rows.length == 0) callback(msg.err_access_no);
                            else if (rows.length == 1) callback(null, rows[0]);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function (photos, callback) {
                        console.log(photos);
                        if (photos.thumbnail != null) {
                            console.log("하핳");
                            var thumbnail_path = path.join(__dirname, '..', 'public', photos.thumbnail);
                            var photo_path = path.join(__dirname, '..', 'public', photos.photo);
                            fs.unlink(thumbnail_path, function (err) {
                                if (err) callback(msg.err_photo_no);
                                else {
                                    fs.unlink(photo_path, function (err) {
                                        if (err) callback(msg.err_photo_no);
                                        else {
                                            callback(null);
                                        }
                                    })
                                }
                            })
                        }
                        else callback(null);
                    },
                    function (callback) {
                        console.log(files);
                        photo.uploadfunc_course2(files, function (thumbnail, photo, photo_org_name) {
                            connection.query(sql.course_modify, [values.title, values.content, values.one_line, photo, thumbnail, photo_org_name, values.logined, values.num], function (err, result) {
//                                console.log([values.title, values.content, values.one_line, photo, thumbnail, photo_org_name, values.logined, values.num]);
                                if (err) callback(err);
                                else if (result.affectedRows == 0) callback(msg.err_access_no);
                                else callback(null);
                            });
                        });
                    },
                    function (callback) {
                        connection.query(sql.course_subject_del, [values.num], function (err, result) {
                            if (err) callback(err);
                            else {
                                async.each(subjects, function (item, callback_each) {
                                    connection.query(sql.course_subject, [values.num, item], function (err, result) {
                                        if (err) callback_each(err);
                                        else callback_each();
                                    })
                                }, function (err) {
                                    if (err) callback(err);
                                    else callback(null);
                                });
                            }
                        })
                    }
                ], function (err) {
                    custom.transaction_end(connection,callback,err,{});
                });
            });
        }
    });
};


exports.delete = function(values,callback){
    var inputs = {};
    inputs.num = values.num;
    inputs.email = values.logined;
    pool.getConnection(function(err,connection) {
        if(err)    msg.err_return(err,callback);
        else {
            connection.query(sql.course_del, [values.logined, values.num], function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else if (result.affectedRows == 0) msg.err_return(msg.err_access_no, callback);
                else {
                    msg.success_return({}, callback);
                }
            });
        }
    });
}


exports.review_write = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;
    inputs.content = values.content;

    pool.getConnection(function(err,connection) {
        if(err)    msg.err_return(err,callback);
        else {
            connection.beginTransaction(function (err) {
                async.parallel([
                    function(callback){
                        connection.query(sql.review_write, [values.grp, values.grp, values.logined, values.title, values.content], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 0) callback(msg.err_access_no);
                            else callback(null);
                        });
                    },
                    function(callback){
                        connection.query(sql.review_alarm, [values.grp,values.logined,values.grp], function(err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    }
                ],function(err){
                    custom.transaction_end(connection,callback,err,{});
                });
            })
        }
    });
};



exports.review_modify = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;
    inputs.content = values.content;


    console.log(inputs);
    pool.getConnection(function(err,connection) {
        if(err)    msg.err_return(err,callback);
        else {
            connection.query(sql.review_modify, [values.title, values.content, values.logined, values.num], function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else if (result.affectedRows == 0) msg.err_return(msg.err_access_no, callback);
                else msg.success_return({}, callback);
            });
        }
    });
};


exports.review_delete = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;
    inputs.content = values.content;

    pool.getConnection(function(err,connection) {
        if(err)    msg.err_return(err,callback);
        else {
            connection.query(sql.review_delete, [values.logined, values.num], function (err, result) {
                connection.release();
                if (err) msg.err_return(err, callback);
                else if (result.affectedRows == 0) msg.err_return(msg.err_access_no, callback);
                else msg.success_return({}, callback);
            });
        }
    });
};


exports.review_good = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;

    console.log(inputs);
    pool.getConnection(function(err,connection) {
        if(err)    msg.err_return(err,callback);
        else {
            connection.query(sql.review_good, [values.grp, values.logined], function (err, result) {
                console.log(this.sql);
                console.log(result.affectedRows);
                connection.release();
                if (err) msg.err_return(err, callback);
                else if (result.affectedRows == 0) msg.err_return(msg.err_access_no, callback);
                else msg.success_return({}, callback);
            });
        }
    });
};


exports.review_good_del = function(values,callback){
    var inputs = {};
    inputs.email = values.logined;
    inputs.grp = values.grp;

    pool.getConnection(function(err,connection) {
        if(err)    msg.err_return(err,callback);
        else {
            connection.query(sql.review_good_del, [values.grp, values.logined], function (err, result) {
                console.log(this.sql);
                console.log(result.affectedRows);
                connection.release();
                if (err) msg.err_return(err, callback);
                else if (result.affectedRows != 1) msg.err_return(msg.err_access_no, callback);
                else msg.success_return({}, callback);
            });
        }
    });
};




