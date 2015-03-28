var mysql = require('./config');
var sql = require('./sqls');
var pool  = mysql.pool;
var async = require('async');
var msg = require('./msg');
var functions = require('./etc');

exports.send = function(values,callback) {
    var from = values.logined;
    var to = values.email;
    var content = values.content;
    var input = {};
    input.from = from;
    input.to = to;
    input.content = content;

    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.beginTransaction(function (err) {
                async.waterfall([
                    function (callback) {
                        if (err) callback(err);
                        else callback(null);
                    },
                    function (callback){
                        connection.query(sql.message_send, input, function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null,result.insertId);
                            else callback(msg.err_unknown_no);
                        });
                    },
                    function(num,callback) {
                        connection.query(sql.meesage_alarm_send, [to,from,num], function (err, result) {
                            if (err) callback(err);
                            else if (result.affectedRows == 1) callback(null);
                            else callback(msg.err_unknown_no);
                        });
                    }
                ],function(err){
                    functions.transaction_end(connection,callback,err,{});
                })
            })
        }
    })
}

exports.getList = function(values,callback) {
    var logined = values.logined;
    var page = values.page;
    var size = 20;

    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.message_list, [logined, (page-1)*size,size], function (err, rows, result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    })
};


exports.getList2 = function(values,callback) {
    var logined = values.logined;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.message_list, [logined], function (err, rows, result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    })
};




exports.read = function(values,callback) {
    var logined = values.logined;
    var num = values.num;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else{
            connection.query(sql.message_read, [num,logined], function (err, result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else if(result.affectedRows == 0) msg.err_return(msg.err_no_reulst_no,callback);
                else msg.success_return({},callback);
            });
        }
    })
};



exports.del = function(values,callback) {
    var logined = values.logined;
    var num = values.num;
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.message_delete, [num, logined], function (err, result) {
                connection.release();
                if(err) msg.err_return(err,callbck);
                else if(result.affectedRows == 0) msg.err_return(msg.err_no_reulst_no,callbck);
                else msg.success_return({},callback);
            });
        }
    });
};

exports.notice= function(values,callback) {
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.notice, [0,10], function (err, rows,result) {
                connection.release();
                if(err) msg.err_return(err,callbck);
                else msg.success_return({list:rows},callback);
            });
        }
    });
};


exports.alarm= function(values,callback) {
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.getAlarm, [values.logined], function (err, rows,result) {
                connection.release();
                if(err) msg.err_return(err,callback);
                else msg.success_return({list:rows},callback);
            });
        }
    });
};


exports.del_alarm= function(values,callback) {
    pool.getConnection(function(err,connection) {
        if (err) msg.err_return(err, callback);
        else {
            connection.query(sql.del_alarm, [values.num,values.logined], function (err, result) {
                console.log(this.sql);
                connection.release();
                if(err) msg.err_return(err,callback);
                else if(result.affectedRows != 1) msg.err_return(msg.err_access,callback);
                else msg.success_return({},callback);
            });
        }
    });
};