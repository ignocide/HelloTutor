/**
 * Created by Administrator on 2015-02-13.
 */
var TP = require('./config').transporter;
var msg = require('./msg');
exports.send_mail_pw = function(email,key,callback){
    var mailOptions = {
        from: 'joonho ✔ <cjh05044@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html:  '<form action="http://localhost/member/reset_pw_form" method="post" name="pw_re">'+
            '<input type="hidden" name="email" value='+email+'>'+
            '<input type="hidden" name="key" value='+key+'>'+
            '<input type="submit" value="비밀번호 변경하기">'+
            '</form>'
        // '<a href=http://localhost/member/find/' + email + '>비밀번호찾기</a>' // html body
    };
    TP.sendMail(mailOptions, function(err, info){
        if(err) callback(err);
        else callback(null);
    });
}



//TP.sendMail(mailOptions, function(error, info){
//    if(error){
//        console.log(error);
//    }else{
//        console.log('Message sent: ' + info.response);
//        res.json({isSuccess : 1});
//    }
//});