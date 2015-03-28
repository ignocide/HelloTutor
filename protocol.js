var mamber_login_success =

{
    "isSuccess" : "0",
    "message" : "실패이유"
}

var main_success =
{
    "isSuccess" : 1,
    "recommend":[
        {
            "email" 	: "tutor@tutor.com",
            "isTutor"        : "1", // 선생 "1", 일반 유저 "0"
            "name" 	: "김선생", //first_name + last_name,
            "thumbnail" 	: "/thumbnail/사진명.png",
            "address_si"	:"서울시",
            "adderss_gu"   :"성북구",
            "subjects"      :["수학", "영어", "과학"]
        },//지인을 찾아보세요
        {
            "email" 	: "lee@tutor.com",
            "isTutor"        : "1", // 선생 "1", 일반 유저 "0"
            "name" 	: "이선생", //first_name + last_name,
            "thumbnail" 	: "/thumbnail/사진명.png",
            "address_si"	:"서울시",
            "adderss_gu"   :"성북구",
            "score": 1,
            "together": 0,
            "subjects"      :["수학", "영어", "과학"]
        }//지인을 찾아보세요
    ],
    "state": [
        {
            "friend_from": "a@a.com",
            "friend_from_name": "aaaa",
            "friend_from_thumbnail": "thumb/a.png",
            "friend_to": "b@b.com",
            "friend_to_name": "bbbb",
            "friend_to_thumbnail": "thumb/b.png",
            "isTutor": 0
        },
        {
            "friend_from": "c@c.com",
            "friend_from_name": "cccc",
            "friend_from_thumbnail": "thumc/c.png",
            "friend_to": "e@e.com",
            "friend_to_name": "eeee",
            "friend_to_thumbnail": "thume/e.png",
            "isTutor": 0
        }
    ],
    "boards" :	[
        {
            "isboard": 0,
            "cate": 1,
            "num": 2,
            "actor": "tutor@tutor.com",
            "isTutor": 1,
            "actor_name": "김선생",
            "actor_thumbnail": "thumb/tutor@tutor.com",
            "writer": "tutor@tutor.com",
            "iswriterTutor": 1,
            "writer_name": "김선생",
            "writer_thumbnail": "thumb/tutor@tutor.com",
            "title": "강의1",
            "content": "강의입니다.",
            "good": 0,
            "cmt": 0,
            "isGood": 0,
            "regdate": "2015-02-03 12:35:24",
            "actdate": "2015-02-03 12:35:24",
            "acc_date": "2015-02-03 12:35:24"
        },
        {
            "isboard": 0,
            "cate": 1,
            "num": 2,
            "actor": "tutor@tutor.com",
            "isTutor": 1,
            "actor_name": "김선생",
            "actor_thumbnail": "thumb/tutor@tutor.com",
            "writer": "tutor@tutor.com",
            "iswriterTutor": 1,
            "writer_name": "김선생",
            "writer_thumbnail": "thumb/tutor@tutor.com",
            "title": "강의1",
            "content": "강의입니다.",
            "good": 0,
            "cmt": 0,
            "isGood": 0,
            "regdate":  "2015-01-20 12:30:24",
            "actdate":  "2015-01-20 12:30:24",
            "acc_date":  "2015-01-20 12:30:24"
        },
        //총 1페이지에 10개
    ]
}
var fail_common =
{
    "isSuccess" : "0",
    "message" : "실패이유"
}


var board_list_success =
{
    "isSuccess" : 1,
    "boards" :	[
        {
            "num": 12,
            "writer": "tutor@tutor.com",
            "isTutor": 1,
            "name": "김선생",
            "thumbnail": null,
            "title": "강의제목",
            "content": "강의내용",
            "regdate": "2015-02-05T21:54:55.000Z",
            "cmt": 0,
            "good": 0,
            "isGood": 0
        },
        {
            "num": 11,
            "writer": "tutor@tutor.com",
            "isTutor": 1,
            "name": "김선생",
            "thumbnail": null,
            "title": "강의제목",
            "content": "강의내용",
            "regdate": "2015-02-05T21:54:35.000Z",
            "cmt": 0,
            "good": 0,
            "isGood": 0
        }//page당 10개
    ]
}


var board_read_success =

{
    "isSuccess": 1,
    "board": {
        "num": 2,
        "writer": "tutor@tutor.com",
        "isTutor": 1,
        "name": "김선생",
        "thumbnail": null,
        "title": "제목",
        "content": "내용",
        "url1": null,
        "url2": null,
        "regdate": "2015-02-03 00:32:56",
        "cmt": 4,
        "good": 4,
        "isGood": 1,
        "photo": [ ]
    },
    "board_comments": [
        {
            "grp": 2,
            "grp_num": 4,
            "actor": "b@b.com",
            "isTutor": 0,
            "name": "bbbb",
            "content": "대앳글파이브",
            "regdate": "2015-02-04 10:14:13"
        },
        {
            "grp": 2,
            "grp_num": 3,
            "actor": "b@b.com",
            "isTutor": 0,
            "name": "bbbb",
            "content": "대앳글포",
            "regdate": "2015-02-04 10:13:24"
        },
        {
            "grp": 2,
            "grp_num": 2,
            "actor": "tutor@tutor.com",
            "isTutor": 1,
            "name": "김선생",
            "content": "대엣글2",
            "regdate": "2015-02-03 00:36:41"
        },
        {
            "grp": 2,
            "grp_num": 1,
            "actor": "tutee@tutee.com",
            "isTutor": 0,
            "name": "이제자",
            "content": "대엣글1",
            "regdate": "2015-02-03 00:36:41"
        }
    ]
}
//
//var course_info_success =
//{
//“isSuccess”  : 1,
//“course” :
//{
//“num” : “2”,
//“writer”: “lee@lee.com”,
//“isTutor” : “0”, //actor의 identify // “0” 일반 유저 “1” 선생
//“writer_name” :”이모씨”,//이모씨의 수업에
//“writer_thumbnail” : “/thumbnail/이모씨.png”,
//“title” : “영어회화조지기”,
//“content” : “내요요용”,
//“one_line” : “한줄소개”
//“thumbnail”  : “/thumbnail/수업.png”,
//“writedate” : “2015-01-19 20:34:20”,
//},
//
//“reviews”  :  [
//    {
//“grp”		: “2”,
//“grp_num”	: “2”,
//“actor”  	: “tutee@google.com”,
//“actor_name”	: “김제자”,
//“title”		: “제에모옥”,
//“content”	: “이 강의 최고예요”,
//“actdate”	: “2015-01-20 20:15:10”,
//“isGood”    : “1”,
//“good”      : “3”
//}, //모든 후기
//]
//}
