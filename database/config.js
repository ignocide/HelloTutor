var mysql = require('mysql');
var nodemailer = require('nodemailer');
exports.pool  = mysql.createPool( {
    connectionLimit : 150,
    host     : '54.65.219.91',
    user     : 'hello_test',
    password : '1234',
    database : 'hello_tutor'
//    database : 'hello_test'
});

exports. transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cjh05044@gmail.com',
        pass: 'junho714'
    }
});