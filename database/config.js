var mysql = require('mysql');
var nodemailer = require('nodemailer');
exports.pool  = mysql.createPool( {
    connectionLimit : 150,
    host     : '54.65.219.91',
    user     : 'secure',
    password : 'secure',
    database : 'secure'
//    database : 'hello_test'
});

exports. transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'secure',
        pass: 'secure'
    }
});