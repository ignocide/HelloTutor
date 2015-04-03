/**
 * Created by Administrator on 2015-02-05.
 */

var mysql = require('./config');
var sql = require('./sqls');
var message = require('./msg');
var pool = mysql.pool;
var async = require('async');
var msg = require('./msg');
var functions = require('./etc');

exports.follow_add = function(datas, callback){
    var logined = datas.logined;
    var email = datas.email;
    console.log(datas.logined);
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.parallel([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        connection.query(sql.follow_add, [email, logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function (callback) {
                        connection.query(sql.follow_alarm_req, [email, logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        })
                    }
                ], function (err/*, result*/) {
//                    if (err) {
//                        connection.rollback(function () {
//                            connection.release();
//                            msg.err_return(err, callback);
//                        });
//                    } else {
//                        connection.commit(function (err) {
//                            if (err) {
//                                connection.rollback(function () {
//                                    connection.release();
//                                    msg.err_return(err, callback);
//                                });
//                            } else {
//                                connection.release();
//                                msg.success_return({}, callback);
//                            }
//                        });
//                    }
                    functions.transaction_end(connection,callback,err,{});
                });
            })
        }
    });
};

exports.follow_break = function(datas, callback){
    var logined = datas.logined;
    var email = datas.email;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.follow_break, [email, logined], function (err, result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else if ((result.affectedRows) == 1) msg.success_return({},callback);
                else msg.err_return(msg.err_unknown_no,callback);
            });
        }
   });

};

exports.friend_req = function(datas, callback) {
    var logined = datas.logined;
    var email = datas.email;

    var input = {};
    input.friend1 = logined;
    input.friend2 = email;
    pool.getConnection(function (err, connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.parallel([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
//                    function (callback) {
//                        connection.query(sql.friend_check, [logined, email], function (err, rows, result) {
//                            if ((rows.length) != 0 || !success || err) {
//                                console.error('err', err);
//                                success = false;
//                                msg = sql.fail;
//                                if (rows[0].agree = 'y') {
//                                    msg.message = msg.friend_already;
//                                } else if (rows[1].agree = 'n') {
//                                    msg.message = msg.friend_req;
//                                } else {
//                                    msg.message = msg.db_error;
//                                }
//                            }
//                            console.log(success);
//                            callback(null, success);
//                        });
//                    },
                    function (callback) {
                        connection.query(sql.friend_alarm_req, [email, logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        })
                    },
                    function (callback) {
                        connection.query(sql.friend_req, input, function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    }
                ], function (err) {
                    functions.transaction_end(connection,callback,err,{});
                });
            });
        }
    });
};



exports.friend_agree = function(datas, callback) {
    var logined = datas.logined;
    var email = datas.email;

    var input = {};
    input.friend1 = logined;
    input.friend2 = email;

    pool.getConnection(function (err, connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.parallel([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function(callback){
                        //exports.friend_agree = "UPDATE friend SET agree = 'y' where friend1 = ? and friend2 = ? and agree = 'n' ";
                        connection.query(sql.friend_alarm_agree, [email, logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function(callback){
                        //exports.friend_agree = "UPDATE friend SET agree = 'y' where friend1 = ? and friend2 = ? and agree = 'n' ";
                        connection.query(sql.friend_agree, [email, logined], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function(callback){
                        connection.query(sql.insert_relation, [email, logined, email, logined,email, logined], function (err, result) {
                            console.log(this.sql);
                            if (err) callback(err);
                            else  callback(null);
                        });
                    }
//                    function(callback){
//                        connection.query(sql.insert_relation1, [email, logined, logined], function (err, result) {
//                            console.log(this.sql);
//                            if (err) callback(err);
//                            else  callback(null);
//                        });
//                    }
                ],function(err){
                    functions.transaction_end(connection,callback,err,{});
                });
            });
        }
    });
};

exports.friend_break = function(datas, callback){
    var logined = datas.logined;
    var email = datas.email;

    var input ={};
    input.logined =  logined;
    input.email =  email;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.parallel([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback) {
                        connection.query(sql.friend_break, [datas.email,datas.logined,datas.logined,datas.email], function(err, result) {
                            console.log(this.sql);
                            console.log(1,result);
                            if (err) callback(err);
                            else if (result.affectedRows != 0) callback(null);//서로 친구요청을 하였을경우 이상함
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function(callback){
                        connection.query(sql.friend_alarm_reject, [email,logined], function(err, result) {
                            console.log(err);
                            console.log(this.sql);
                            console.log(2,result);
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    }
                ], function (err) {
                    functions.transaction_end(connection,callback,err,{});
                })
            })
        }
    });
};



exports.friend_list = function(values, callback){

    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.friend_list2, [values.logined], function (err, rows,result) {
                connection.release();
                if (err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    });
};

exports.follow_list = function(values, callback){

    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.follow_list2, [values.logined], function (err, rows,result) {
                console.log(rows);
                connection.release();
                if (err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    });
};


exports.alarm_relation_del = function(values, callback){
    pool.getConnection(function(err, connection){
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.alarm_relation_del, [values.from,values.to,values.logined], function (err,result) {
                connection.release();
                if (err) msg.err_return(err,callback);
                else msg.success_return({},callback);
            });
        }
    });
}


