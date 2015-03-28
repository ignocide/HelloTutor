exports.friend_already = "이미 친구관계입니다.";

exports.friend_req = "이미 친구요청을 하였습니다.";

exports.db_error = "DB오류입니다.";

exports.login_fail = "아이디 혹은 비밀번호가 잘못되었습니다.";

exports.err_db_parmas = "Params에 null 이 있습니다.";

exports.err_db_syntax = "SQL 문법 ERROR";

exports.no_result = "결과가 없습니다.";

exports.err_unknown = "알수 없는 오류입니다.";

exports.err_db_reference = "DB 레퍼런스 참조 오류";

exports.err_access = "사용자 접근이 불가능거나 해당 컨탠츠가 존재하지 않습니다.";

exports.err_photo = "파일 삭제 실패";

exports.err_db_coulumn = "디비 컬럼 문제";

exports.err_db_No_column = "일부 컬럼이 존재하지 않습니다.";

exports.err_login_fail = "아이디나 비밀번호를 확인해 주세요.";

exports.err_wrong_access = "잘못된 접근입니다.";

exports.err_no_reulst = "해당 컨탠츠가 존재하지 않습니다.";

exports.err_key_duplicate = "키가 중복되어 있습니다.(이미 입력되어있는 값입니다.)";

exports.err_access_no = {"errno":2000000};

exports.err_photo_no = {"errno":5000000};

exports.err_login_fail_no = {"errno":2100000};

exports.err_wrong_access_no = {"errno":2200000};

exports.err_no_reulst_no = {"errno":2300000};

exports.err_unknown = {"errno":999999};

exports.err_unknown_no = {"errno":999999};


exports.err_return = function(err,callback){
    console.log(err);
    var send_message = {};
    send_message.isSuccess = 0;
    switch (err.errno){
        case 1048 :
            send_message.message = this.err_db_parmas;
            callback(send_message);
            return;
        case 1054 :
            send_message.message = this.err_db_No_column;
            callback(send_message);
            return;
        case 1062 :
            send_message.message = this.err_key_duplicate;
            callback(send_message);
            return;
        case 1064 :
            send_message.message = this.err_db_syntax;
            callback(send_message);
            return;
        case 1136 :
            send_message.message = this.err_db_coulumn;
            callback(send_message);
            return;
        case 1452 :
            send_message.message = this.err_db_syntax;
            callback(send_message);
            return;
        case 1000000 :
            send_message.message = this.no_result;
            callback(send_message);
            return;
        case 2000000 :
            send_message.message = this.err_access;
            callback(send_message);
            return;
        case 2100000 :
            send_message.message = this.err_login_fail;
            callback(send_message);
            return;
        case 2200000 :
            send_message.message = this.err_wrong_access;
            callback(send_message);
            return;
        case 2300000 :
            send_message.message = this.err_no_reulst;
            callback(send_message);
            return;
        case 5000000 :
            send_message.message = this.err_photo;
            callback(send_message);
            return;
        default :
            send_message.message = this.db_error;
            callback(send_message);
            return;
    }
}



exports.success_return = function(sendmessage,callback) {
    sendmessage.isSuccess = 1;
    callback(sendmessage);
}



