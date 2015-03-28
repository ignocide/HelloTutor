/**
 * Created by Administrator on 2015-02-14.
 */
var msg = require('./msg');
exports.transaction_end = function(connection,callback,err,result){
    if (err) {
        connection.rollback(function () {
            connection.release();
            msg.err_return(err, callback);
        });
    } else {
        connection.commit(function (err) {
            if (err) {
                connection.rollback(function () {
                    connection.release();
                    msg.err_return(err, callback);
                });
            } else {
                connection.release();
                msg.success_return(result, callback);
            }
        });
    }
}

////중간에 에러가 발생한다면 롤백 실행, 후 실패 메세지 전송
//if (err) {
//    connection.rollback(function () {
//        connection.release();
//        msg.err_return(err, callback);
//    });
//}
////에러가 없다면 커밋, 커밋 중 트렌젝션 발생시 롤백, 성공한다면 성공메세지 전송
//else {
//    connection.commit(function (err) {
//        if (err) {
//            connection.rollback(function () {
//                connection.release();
//                msg.err_return(err, callback);
//            });
//        }
//        else {
//            connection.release();
//            sendmessage.success = 1;
//            callback(sendmessage)
//        }
//    });
//}
exports.to_array = function(obj,target_name){
    console.log("여기여기");
    var tmp = {};
    tmp[target_name] = [];
    console.log(tmp);
    for(var i = 0;i<(obj.length);i++){
        // console.log(sub_obj[i].subjects);
        tmp[target_name].push(obj[i][target_name]);
    }
    return tmp;
};