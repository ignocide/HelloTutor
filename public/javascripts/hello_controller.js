var app = angular.module('HelloTutor', ['angular-flexslider']);
// var ip="http://127.0.0.1";
var ip="";
var debug = true;
var openSide = function (a,b,c) {
	console.log(this);
	$("#main #sidebar").panel("open");
};
// $(document).on('swiperight', '#main',openSide);
// $(document).off('swiperight', '#state_list');

$(function(){
    $("#main").bind("swiperight", function(){
		$("#main #sidebar").panel("open");
    });
    $("#recommend_tutor").bind("swiperight", function(){
		$("#recommend_tutor #sidebar").panel("open");
    });
    $("#recommend_user").bind("swiperight", function(){
		$("#recommend_user #sidebar").panel("open");
    });
    $("#tutor_simple").bind("swiperight", function(){
		$("#tutor_simple #sidebar").panel("open");
    });   
    $("#friend_list").bind("swiperight", function(){
		$("#friend_list #sidebar").panel("open");
    });
    $("#follower_list").bind("swiperight", function(){
		$("#follower_list #sidebar").panel("open");
    });
    $("#board").bind("swiperight", function(){
		$("#board #sidebar").panel("open");
    });
    $("#course").bind("swiperight", function(){
		$("#course #sidebar").panel("open");
    });
    $("#alarm").bind("swiperight", function(){
		$("#alarm #sidebar").panel("open");
    });
    $("#message").bind("swiperight", function(){
		$("#message #sidebar").panel("open");
    });
    $("#notice").bind("swiperight", function(){
		$("#notice #sidebar").panel("open");
    });
    $("#search_user").bind("swiperight", function(){
		$("#search_user #sidebar").panel("open");
    });
    $("#search_tutor").bind("swiperight", function(){
		$("#search_tutor #sidebar").panel("open");
    });
    $("#search_course").bind("swiperight", function(){
		$("#search_course #sidebar").panel("open");
    });
    $("#tutor_simple").bind("swiperight", function(){
		$("#tutor_simple #sidebar").panel("open");
    });
    $("#tutor_detail").bind("swiperight", function(){
		$("#tutor_detail #sidebar").panel("open");
    });
    $("#user_simple").bind("swiperight", function(){
		$("#user_simple #sidebar").panel("open");
    });
    $("#board_list").bind("swiperight", function(){
		$("#board_list #sidebar").panel("open");
    });
});


var profile;

angular.element(window).bind('load',function(){
	$.ajax({
		type: "POST",
		url: ip+'/member/getProfile',
		data: {},
		success: function(data){
				console.log(data);
				if(data.profile != undefined){
					profile = data.profile;
					$.mobile.changePage('#main');	
				}
				else{
					$.mobile.changePage('#home');
				}
			},
		dataType: "json"
	});
})




app.factory('common',function(){
	var profile = {};
	return {profile:profile};
})


app.factory('userinfo', function() {
	//유저 공통
    var userinfo = {};
   	userinfo.firstname = "";
   	userinfo.lastname = "";
   	userinfo.email="";
   	userinfo.pw="";
    return userinfo;
});



app.factory('joininfo',function(){
	//과목 및 주소
	var joininfo=
	{
		setAddress_si:function(si){
			return si;
		},
		setAddress_gu:function(gu){
			return gu;
		},
	"classes":
		[
			{"cate": "국어",
				"subject":["국어"]},
			{"cate":"수학",
				"subject":["수학"]},
			{"cate":"과학",
				"subject":["과학","과학탐구"]},
			{"cate":"사회",
				"subject":["사회","사회탐구"]},
			{"cate":"영어",
				"subject":["영어","영어회화","탭스","토익","토플","IELTS"]}
		],
	"address_si":
		["서울시"],
	"address_gu":
		[
			{"cate":"ㄱ",
				"gu":["강남구",'강동구','강북구','강서구','관악구','광진구','구로구','금천구']},
			{"cate":"ㄴ",
				"gu":['노원구']},
			{"cate":"ㄷ",
				"gu":['도봉구','동대문구','동작구']},
			{"cate":"ㅁ",
				"gu":['마포구']},
			{"cate":"ㅅ",
				"gu":['서대문구','서초구','성동구','성북구','송파구']},
			{"cate":"ㅇ",
				"gu":['양천구','영등포구','용산구','은평구']},
			{"cate":"ㅈ",
				"gu":['종로구','중구','중랑구']}
		]
	}

	return joininfo;
})


app.controller('joinCtrl', function($scope,userinfo) {
	var no_firstname="이름을 입력하세요";
	var no_lastname="성을 입력하세요";
	var no_email="이메일을 입력하세요";
	var wrong_email="이메일주소가 형식에 맞지 않습니다.";
	var no_pw="비밀번호를 입력하세요";
	var wrong_pw="비밀번호는 6자리 이상 13자 이하,영문 숫자의 조합으로 가능합니다";
	var check_pw="비밀번호를 확인하세요";
	var isExist="중복된 이메일입니다";

	$scope.warning_msg = "";
	$scope.user = userinfo;
	$scope.user.firstname="성민";
	$scope.user.lastname="김";
	$scope.user.email="ignocide@gmail.com";
	$scope.user.pw="tjdals12";
	$scope.pw_re="tjdals12";
	$scope.email_ch = false;

	$scope.email_check = function() {
    	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if(!regEmail.test($scope.user.email)) {
	    	$scope.email_ch=false;
	    	$scope.warning_msg=wrong_email;
	        $("#warning").popup("open");
          	return false;
     	}
     	else{
			// check_email($scope.user.email,$scope.email_ch,$scope.warning_msg);
			var url = '/users/check_email';
			var input = {};
			input.email = $scope.user.email;

			$.post(url,input,function(data){
			    if(data.isExist >= 1){
			    	$scope.email_ch=false;
			    	$scope.warning_msg=isExist;
			        $("#warning").popup("open");
			    }
			    else{
			    	$scope.email_ch=true;
			    }
			},"json");
		}
	};

	$scope.join_common= function(){
		//유효성 체크
	    var regPw = /^[a-zA-Z0-9]{6,13}$/;

		if(isEmpty($scope.user.firstname,no_firstname)){}		//이름의 공백 여부를 체크
		else if(isEmpty($scope.user.lastname,no_lastname)){}	//성의 공백 여부를 체크
		else if(isEmpty($scope.user.email,no_email)){}			//이메일(아이디)의 공백 여부를 체크
		else if(!$scope.email_ch){								//
			$scope.warning_msg=isExist;
			$("#warning").popup("open");
			return false;
		}
		else if(isEmpty($scope.user.pw,no_pw)){}
		else if(!regPw.test($scope.user.pw)){
			$scope.warning_msg=wrong_pw;
			$("#warning").popup("open");
			return false;
		}
		else if(isEmpty($scope.pw_re,no_pw)){}
		else if($scope.user.pw!=$scope.pw_re){
			$scope.warning_msg=check_pw;
			$("#warning").popup("open");
			return false;
		}
		else{
			$.mobile.changePage("#join_choose");
		}
	}

	var isEmpty = function(target,msg){
		if(target == ""){
			$scope.warning_msg=msg;
			$("#warning").popup("open");
			return true;
		}
		else return false;
	}
});

app.controller('join_tutorCtrl', function($scope,userinfo,joininfo,functions) {
	$scope.tutor=userinfo;
	$scope.name = $scope.tutor.lastname+$scope.tutor.firstname;
	$scope.classes = joininfo.classes;
	$scope.address_si = joininfo.address_si;
	$scope.address_gu = joininfo.address_gu;
	$scope.setAddress_si = function(si){
		$("#address_si_list").popup("close");
		$scope.tutor.address_si = joininfo.setAddress_si(si);
	}
	$scope.setAddress_gu = function(gu){
		$("#address_gu_list").popup("close");
		$scope.tutor.address_gu = joininfo.setAddress_gu(gu);
	}

	$scope.subjects=[];
	var subject_index;

	$scope.subject_popup = function(index){
	    subject_index = index;
	    $("#subject_list").popup("open");
	}

	$scope.set_sub = function(subject){
		$scope.subjects[subject_index] = subject;
	    $("#subject_list").popup("close");
	}

	$scope.join = function(){
		console.log("clicked");
        var fd = new FormData();
 //        	$scope.warning_msg = "";
	// $scope.user = userinfo;
	// $scope.user.firstname="성민";
	// $scope.user.lastname="김";
	// $scope.user.email="ignocide@gmail.com";
	// $scope.user.pw="tjdals12";
	// $scope.pw_re="tjdals12";
	// $scope.email_ch = false;
        fd.append('first_name',$scope.tutor.firstname);
        fd.append('last_name',$scope.tutor.lastname);
        fd.append('email',$scope.tutor.email);
        fd.append('pw', $scope.tutor.pw);
        fd.append('address_si', $scope.address_si);
        fd.append('address_gu', $scope.address_gu);
        fd.append('birthday', $scope.birthday);
        fd.append('gender', $scope.gender);
        fd.append('photo', $scope.photo);
    	fd.append('subjects',$scope.subjects[0]);
    	if($scope.subjects[0] != null && $scope.subjects[1] != undefined){
        	fd.append('subjects',$scope.subjects[1]);
	    	if($scope.subjects[1] != null && $scope.subjects[2] != undefined){
	        	fd.append('subjects',$scope.subjects[2]);
        	    	if($scope.subjects[2] != null && $scope.subjects[3] != undefined){
        			fd.append('subjects',$scope.subjects[3]);
    			}
    		}
    	}

		functions.join_tutor(fd,function(data){
			console.log(data);
			if(data.isSuccess)
				$.mobile.changePage("#login");
			else
				$.mobile.changePage("#home");	

		});
	}
});



app.controller('join_userCtrl', function($scope,userinfo,joininfo,functions) {
	$scope.user=userinfo;
	$scope.name = $scope.user.lastname+$scope.user.firstname;
	$scope.classes = joininfo.classes;
	$scope.address_si = joininfo.address_si;
	$scope.address_gu = joininfo.address_gu;
	$scope.setAddress_si = function(si){
		$("#address_si_list2").popup("close");
		$scope.user.address_si = joininfo.setAddress_si(si);
	}
	$scope.setAddress_gu = function(gu){
		$("#address_gu_list2").popup("close");
		$scope.user.address_gu = joininfo.setAddress_gu(gu);
	}

	$scope.join = function(){
        var fd = new FormData();
 //        	$scope.warning_msg = "";
	// $scope.user = userinfo;
	// $scope.user.firstname="성민";
	// $scope.user.lastname="김";
	// $scope.user.email="ignocide@gmail.com";
	// $scope.user.pw="tjdals12";
	// $scope.pw_re="tjdals12";
	// $scope.email_ch = false;
        fd.append('first_name',$scope.user.firstname);
        fd.append('last_name',$scope.user.lastname);
        fd.append('email',$scope.user.email);
        fd.append('pw', $scope.user.pw);
        fd.append('address_si', $scope.user.address_si);
        fd.append('address_gu', $scope.user.address_gu);
        fd.append('birthday', $scope.birthday);
        fd.append('gender', $scope.gender);
        fd.append('photo', $scope.photo);
        fd.append('school_name', $scope.school_name);
        fd.append('grade', $scope.grade);

        console.log(fd);
		functions.join_user(fd,function(data){
			console.log(data);
			if(data.isSuccess)
				$.mobile.changePage("#login");
			else
				$.mobile.changePage("#home");	
		});
	}
});



// headers: {
//                 'Content-Type': 'multipart/form-data'
//             },

app.controller('loginCtrl', function($scope,common,functions) {
	$scope.warning_msg="비밀번호, 이메일을 확인해 주세요.";
	$scope.email = 'heesuk@naver.com';
	$scope.pw = 'academy1';

	$scope.find_pw = function(){
			functions.find_pw($scope.find_email,function(data){
				if(data.isSuccess == 1){
					alert("이메일을 확인하세요.");
					$.mobile.changePage("home");
				}
			});
	}
	$scope.doLogin = function(){
		functions.doLogin($scope.email,$scope.pw,function(data){
		if(data.isSuccess == 1){
			$.extend(common.profile,data.profile);
			$.mobile.changePage('#main');
		}
		else{
			$scope.pw="";
			$("#warning2").popup("open");
		}
	})
	}
});


app.controller('mainCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.boards = [];
	$scope.endmessage = "";
	$scope.toProfile = function(email,isTutor){
		console.log(email);
		console.log(isTutor);
		functions.toProfile(email,isTutor);
	}
	$scope.toCourse = function(num){
		functions.toCourse(num);
	}

	$scope.toBoard= function(num){
		functions.toBoard(num);
	}

	$scope.delState = function(num){
		console.log('clicked');
		console.log(num);
		functions.delState($scope.state[0].friend_from,$scope.state[0].friend_to,function(data){
			if(data.isSuccess){
				$scope.state.splice(num,1);
			}else{
				alert("서버 오류");
			}
		});
	}

	$scope.reqFriend = function(index){
		functions.reqFriend($scope.recommends[index].email,function(data){
			if(data.isSuccess){
				$scope.recommends[index].isFriend = 1;
			}
		})
	}

	$scope.delFriend = function(index){
		functions.delFriend($scope.recommends[index].email,function(data){
			if(data.isSuccess){
				$scope.recommends[index].isFriend = 0;
			}
		})
	}
	var page = 1;
	$(document).on('pageshow','#main',function(){
		if(profile != null){
			$.extend(common.profile,profile);
		}
		console.log(common.profile);
		console.log($scope.profile);

		functions.getMain(page,function(data){
			if(data.isSuccess){
				if(page == 1){
					$scope.recommends = data.recommends;
					$scope.state = data.state;					
				}
				if(data.boards.lenght != 0)
					$.merge($scope.boards,data.boards);
				else
					$scope.endmessage = "더 이상의 게시물이 없습니다."
			}
			else{
				alert("server error");
				$.mobile.changePage('#home');
			}
			page++;
		})
    });
});



app.controller('noticeCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.notice = [];
	$scope.endmessage = "";
	$(document).on('pageshow','#notice',function(){
		console.log(common.profile);
		console.log($scope.profile);
		functions.getNotice(function(data){
			console.log(data);
			if(data.isSuccess){
				$scope.notice = data.list;
				if(data.list.lenght == 0)
					$scope.endmessage = "더 이상의 게시물이 없습니다.";
				console.log($scope.notice);
			}
			else{
				alert("server error");
				$.mobile.changePage('#home');
			}
		})
    });

});

app.controller('alarmCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.alarm = [];
	$scope.endmessage = "";
	$scope.content = "";

	$scope.delAlarm = function(index){

		functions.delAlarm($scope.alarm[index].num,function(data){
			if(data.isSuccess){
				$scope.alarm.splice(index,1);
			}
		})
	}

	var target;
	$scope.reject_alarm_dialog = function(num){
		console.log('clicked');
		target = num;
		$('#req_reject').popup('open');
	}
	$scope.accept_alarm_dialog = function(num){
		target = num;
		$('#req_accept').popup('open');
	}
	
	$scope.reject_alarm = function(){
		functions.delAlarm($scope.alarm[target].num,function(data){
			if(data.isSuccess){
				functions.delFriend($scope.alarm[target].actor,function(data){
					if(data.isSuccess){
						$scope.alarm.splice(target,1);
						$('#req_reject').popup('close');
					}
					else{
						alert("server error");
						$('#req_reject').popup('close');
					}
				})
			}
			else{
				alert("server error");
				$('#req_reject').popup('close');
			}
		})
	}

	$scope.accept_alarm = function(){
		functions.delAlarm($scope.alarm[target].num,function(data){
			console.log(data);
			if(data.isSuccess){
				functions.agreeFriend($scope.alarm[target].actor,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.alarm.splice(target,1);
						$('#req_accept').popup('close');
					}
					else{
						alert("server error");
						$('#req_accept').popup('close');
					}
				})
			}
			else{
				alert("server error");
				$('#req_accept').popup('close');
			}
		})
	}

	$scope.open_message_frm = function(num){
		target = num;
		$('#send_message').popup('open');
	}

	$scope.send_message = function(){
		if($scope.content == ""){
			alert("내용을 입력하세요");
		}
		else{
			functions.sendMessage($scope.alarm[target].actor,$scope.content,function(data){
				if(data.isSuccess){
					$('#send_message').popup('close');
				}
			})
		}
	}



	$scope.toBoard = function(num){
		functions.toBoard(num);
	}

	$scope.toCourse = function(num){
		functions.toCourse(num);
	}

	$(document).on('pageshow','#alarm',function(){
		console.log(common.profile);
		console.log($scope.profile);
		functions.getAlarm(function(data){
			console.log(data);
			if(data.isSuccess){
				$scope.alarm = data.list;
				if(data.list.lenght == 0)
					$scope.endmessage = "더 이상의 알람이 없습니다.";
				console.log($scope.alarm);
			}
			else{
				alert("server error");
				$.mobile.changePage('#home');
			}
		})
    });

});



app.controller('rcm_tutorCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";

	$scope.toProfile = function(email,isTutor){
		functions.toProfile(email,isTutor);
	}

	$scope.reqFriend = function(index){
		functions.reqFriend($scope.list[index].email,function(data){
			if(data.isSuccess){
				$scope.list[index].isFriend = 1;
			}
		})
	}

	$scope.delFriend = function(index){
		functions.delFriend($scope.list[index].email,function(data){
			if(data.isSuccess){
				$scope.list[index].isFriend = 0;
			}
		})
	}
	var page = 1;
	$(document).on('pageshow','#rcm_tutor',function(){
			if($scope.list.length == 0){
				functions.getRcm_tutor(page,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 추천이 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
		}
    });

});

app.controller('rcm_userCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";

	$scope.toProfile = function(email,isTutor){
		functions.toProfile(email,isTutor);
	}

	$scope.reqFriend = function(index){
		functions.reqFriend($scope.list[index].email,function(data){
			if(data.isSuccess){
				$scope.list[index].isFriend = 1;
			}
		})
	}

	$scope.delFriend = function(index){
		functions.delFriend($scope.list[index].email,function(data){
			if(data.isSuccess){
				$scope.list[index].isFriend = 0;
			}
		})
	}
	var page = 1;
	$(document).on('pageshow','#rcm_user',function(){
			if($scope.list.length == 0){
				functions.getRcm_user(page,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 추천이 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
		}
    });

});




app.controller('messageCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";
	// $scope.content = "";
	var target;
	$scope.open_message_frm = function(num){
		console.log('clicked');
		target = num;
		$('#message #send_message').popup('open');
	}

	$scope.send_message = function(){
		console.log($scope.list[target].from);
		console.log($scope.content);
		if($scope.content == ""){
			alert("내용을 입력하세요");
		}
		else{
			functions.sendMessage($scope.list[target].from,$scope.content,function(data){
				if(data.isSuccess){
					$('#message #send_message').popup('close');
				}
			})
		}
	}

	$scope.delMessage = function(num){	
		console.log(num);
		target = num;
		functions.readMessage($scope.list[target].num,function(data){
			console.log(data);
				if(data.isSuccess){
					// console.log($scope.list.splice(target,1));
					$scope.list.splice(target,1);
				}
				else{
					alert('삭제에 실패하였습니다.');
				}
			})
	}
	var page = 1;
	$(document).on('pageshow','#message',function(){
			console.log(common.profile);
			console.log($scope.profile);
			if($scope.list.length == 0){
				functions.getMessage(page,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 추천이 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
		}
    });

});	


app.controller('searchUserCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";
	$scope.keyword = "";
	var page = 1;	
	var temp = "";

	$scope.toProfile = function(email,isTutor){
		functions.toProfile(email,isTutor);
	}

	$scope.reqFriend = function(index){
		functions.reqFriend($scope.list.email)
	}


	$scope.search = function(){
		console.log(1,$scope.keyword);
		functions.getSearchUser($scope.keyword,1,function(data){
					console.log(data);
					if(data.isSuccess){
						temp = $scope.keyword;
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 검색 결과가 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	}

});


app.controller('searchTutorCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";
	$scope.keyword = "";
	var page = 1;
	var temp = "";

	$scope.toProfile = function(email,isTutor){
		functions.toProfile(email,isTutor);
	}
	$scope.search = function(){
		console.log(2,$scope.keyword);
		functions.getSearchTutor($scope.keyword,1,function(data){
					console.log(data);
					if(data.isSuccess){
						temp = $scope.keyword;
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 검색 결과가 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	}

});


app.controller('searchCourseCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";
	$scope.keyword = "";

	$scope.toProfile = function(email,isTutor){
		functions.toProfile(email,isTutor);
	}

	$scope.toCourse = function(num){
		functions.toCourse(num);
	}

	var page = 1;
	var temp = "";
	$scope.search = function(){
		console.log(3,$scope.keyword);
		functions.getSearchCourse($scope.keyword,1,function(data){
					console.log(data);
					if(data.isSuccess){
						temp = $scope.keyword;
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 검색 결과가 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	}

});



app.controller('followerlistCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";
	$scope.keyword = "";

	var page = 1;
	var temp = "";
	$(document).on('pageshow','#follower_list',function(){
		functions.getFollowerlist(function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 검색 결과가 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});

});



app.controller('friendlistCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];
	$scope.endmessage = "";
	$scope.keyword = "";

	var page = 1;
	var temp = "";
	$(document).on('pageshow','#friend_list',function(){
		functions.getFriendlist(function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.list = data.list;
						if(data.list.lenght == 0)
							$scope.endmessage = "더 이상의 검색 결과가 없습니다.";
						else
							page++;
						console.log($scope.list);
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});

});




app.controller('tutorSimpleCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.tutor = [];
	$scope.toDetail = function(email){
		profile_email = email;
		$.mobile.changePage("#tutor_detail");

	}
	$scope.toBoardList = function(){
		functions.toBoardList();
	}

	$scope.open_message_frm = function(){
		$('#tutor_simple #send_message').popup('open');
	}

	$scope.send_message = function(){
		if($scope.content == ""){
			alert("내용을 입력하세요");
		}
		else{
			functions.sendMessage($scope.tutor.email,$scope.content,function(data){
				if(data.isSuccess){
					$('#tutor_simple #send_message').popup('close');
				}
			})
		}
	}


	$scope.friend_req = function(email){
		functions.reqFriend(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFriend = 1;
			}
		})
	}

	$scope.friend_break = function(email){
		functions.delFriend(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFriend = 0;
			}
		})
	}

	$scope.follow_req = function(email){
		functions.reqFollow(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFollow = 1;
			}
		})
	}


	$scope.follow_break = function(email){
		functions.delFollow(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFollow = 0;
			}
		})
	}

	$(document).on('pageshow','#tutor_simple',function(){
		functions.getTutorSimple(profile_email,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.tutor = data.tutor;
						$scope.courses = data.courses;
						$scope.board = data.board;
						$scope.follow_list = data.follow_list;
						$scope.friend_list = data.friend_list;
						$scope.relation_me = data.relation_me;
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});

});


app.controller('userSimpleCtrl', function($scope,common,functions) {
	$scope.profile = common.profile;
	$scope.tutor = [];	

	$scope.toBoardList = function(){
		functions.toBoardList();
	}

	$scope.open_message_frm = function(){
		$('#user_simple #send_message').popup('open');
	}

	$scope.send_message = function(){
		if($scope.content == ""){
			alert("내용을 입력하세요");
		}
		else{
			functions.sendMessage($scope.user.email,$scope.content,function(data){
				if(data.isSuccess){
					$('#user_simple #send_message').popup('close');
				}
			})
		}
	}

	$scope.friend_req = function(email){
		functions.reqFriend(email,function(data){
			if(data.isSuccess){
				$scope.relation_me = 1;
			}
		})
	}

	$scope.friend_break = function(email){
		functions.delFriend(email,function(data){
			if(data.isSuccess){
				$scope.relation_me = 0;
			}			
		})
	}


	$(document).on('pageshow','#user_simple',function(){
		console.log($scope.profile);
		functions.getUserSimple(profile_email,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.user = data.user;
						$scope.board = data.board;
						$scope.friend_list = data.friend_list;
						$scope.relation_me = data.relation_me;
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});

});


app.controller('tutorDetailCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.tutor = [];



	$scope.open_message_frm = function(){
		$('#tutor_detail #send_message').popup('open');
	}

	$scope.send_message = function(){
		if($scope.content == ""){
			alert("내용을 입력하세요");
		}
		else{
			functions.sendMessage($scope.tutor.email,$scope.content,function(data){
				if(data.isSuccess){
					$('#tutor_detail #send_message').popup('close');
				}
			})
		}
	}

	$scope.friend_req = function(email){
		functions.reqFriend(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFriend = 1;
			}
		})
	}

	$scope.friend_break = function(email){
		functions.delFriend(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFriend = 0;
			}			
		})
	}

	$scope.follow_req = function(email){
		functions.reqFollow(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFollow = 1;
			}
		})
	}


	$scope.follow_break = function(email){
		functions.delFollow(email,function(data){
			if(data.isSuccess){
				$scope.relation_me.isFollow = 0;
			}
		})
	}


	$(document).on('pageshow','#tutor_detail',function(){
		functions.getTutorDetail(profile_email,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.tutor = data.tutor;
						$scope.url = data.URL;
						$scope.tutor_career = data.tutor_career;
						$scope.relation_me = data.relation_me;
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});

});




app.controller('courseCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.course = [];
	$scope.review_content ="";
	$scope.toProfile = function(email){
		functions.toProfile(email,1);
	}

	$scope.writeReview = function(){

		if($scope.review_content == ""){
			alert("리뷰를 입력하세요");

		}
		else{
			functions.writeReview($scope.course.num,$scope.review_content,function(data){
				if(data.isSuccess){
					$scope.reviewFrm = !$scope.reviewFrm;
					$scope.review_content = "";
					$.mobile.changePage(
						'#course',
						{
						 allowSamePageTransition : true,
						 transition              : 'none',
						 showLoadMsg             : false,
						 reloadPage              : false
						}
					);
				}
			})			
		}
	}

	$scope.review_good_req = function(index){
		console.log(index);
		functions.reqReviewgood($scope.review[index].num,function(data){
			if(data.isSuccess){
				$scope.review[index].good += 1;
				$scope.review[index].isGood = 1;
			}
		})
	}

	$scope.review_good_del = function(index){
		console.log(index);
			functions.delReviewgood($scope.review[index].num,function(data){
			if(data.isSuccess){
				$scope.review[index].good -= 1;
				$scope.review[index].isGood = 0;
			}
		})
	}
	$(document).on('pageshow','#course',function(){
		functions.getCourse(course,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.course = data.course;
						$scope.review = data.review;
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});
});


app.controller('boardCtrl', function($scope,common,functions) {
	$scope.profile = common.profile;
	$scope.board = [];

	$scope.toProfile = function(email,isTutor){
		functions.toProfile(email,isTutor);
	}

	$scope.writeComment = function(){
		if($scope.comment_content == ""){
			alert("리뷰를 입력하세요");

		}
		else{
			functions.writeComment($scope.board.num,$scope.comment_content,function(data){
				if(data.isSuccess){
					$scope.show_cmt = !$scope.show_cmt;
					$scope.comment_content = "";
					$.mobile.changePage(
						'#board',
						{
						 allowSamePageTransition : true,
						 transition              : 'none',
						 showLoadMsg             : false,
						 reloadPage              : false
						}
					);
				}
			})			
		}
	}

	$scope.board_good_req = function(){
		functions.reqBoardgood($scope.board.num,function(data){
			if(data.isSuccess){
				$scope.board.good += 1;
				$scope.board.isGood = 1;
			}
		})
	}

	$scope.board_good_del = function(){
		functions.delBoardgood($scope.board.num,function(data){
			if(data.isSuccess){
				$scope.board.good -= 1;
				$scope.board.isGood = 0;
			}
		})
	}

	$(document).on('pageshow','#board',function(){
		functions.getBoard(board,function(data){
					console.log(data);
					if(data.isSuccess){
						$scope.board = data.board;
						$scope.comments = data.board_comments;
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});
});



app.controller('boardListCtrl', function($scope,common,functions) {
	$scope.profile = common.profile;
	$scope.list = [];

	$scope.toBoard= function(num){
		functions.toBoard(num);
	}


	var page=1;
	$(document).on('pageshow','#board_list',function(){
		functions.getBoardList(profile_email,page,function(data){
					console.log(data);
					if(data.isSuccess){
						if(data.list.length>0){
							console.log(11);
							$scope.list = data.list;
							page++;
						}
					}
					else{
						alert("server error");
						$.mobile.changePage('#home');
					}
			})
	});
});


app.controller('boardWriteCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.photo = [];
	$scope.title = "";
	$scope.content = "";
	$scope.url1 = "";
	$scope.url2 = "";

	$scope.writeBoard = function(){
		console.log("photo",$scope.photo);
        var fd = new FormData();
        fd.append('title',$scope.title);
        fd.append('content',$scope.content);
        fd.append('url1',$scope.url1);
        fd.append('url2',$scope.url2);
        fd.append('photo', $scope.photo[0]);
        if($scope.photo[0] != null){
        	fd.append('photo', $scope.photo[1]);
	    	if($scope.photo[1] != null){
	    		fd.append('photo', $scope.photo[2]);
        		if($scope.photo[2] != null){
    				fd.append('photo', $scope.photo[3]);
        			if($scope.photo[3] != null){
        				fd.append('photo', $scope.photo[4]);
        				if($scope.photo[4] != null){
							fd.append('photo', $scope.photo[5]);
        					if($scope.photo[5] != null){
         						fd.append('photo', $scope.photo[6]);
        						if($scope.photo[6] != null){
        							fd.append('photo', $scope.photo[7]);
        							if($scope.photo[7] != null){
        								fd.append('photo', $scope.photo[8]);
        								if($scope.photo[8] != null){
        									fd.append('photo', $scope.photo[9]);    
        								}
        							}
    							
        						}
 						
        					}

        				}
        					
        			}

        		}

	    	}
	    		
		}
		console.log(fd)
        
		// var input = {};
		// input.title = $scope.title;
		// input.content = $scope.content;
		// input.url1 = $scope.url1;
		// input.url2 = $scope.url2;
		// input.file = $scope.photo[0];
		// console.log($scope.photo[0])
		functions.writeBoard(fd,function(data){
			console.log(data);
		})
	}
});





app.controller('courseWriteCtrl', function($scope,$http,common,functions) {
	$scope.profile = common.profile;
	$scope.writeCourse = function(){
        var fd = new FormData();
        fd.append('title',$scope.title);
        fd.append('content',$scope.content);
        fd.append('one_line',$scope.one_line);
        fd.append('photo', $scope.photo);
		functions.writeCourse(fd,function(data){
			console.log(data);
		})
	}
});


app.controller('logoutCtrl', function($scope,common,functions){
	$(document).on('pageshow','#logout',function(){
		functions.logout(function(data){
			if(data.isSuccess){
				$.mobile.changePage('#home');
			}
			else{
				alert('logout 실패');
			}
		})
	})
});