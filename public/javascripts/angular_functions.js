
var profile_email = "";
var friend_list = "";
var follower_list = "";
var course = "";
var board = "";
var board_list ="";

app.service('functions', function($http){
	this.toProfile = function(email,isTutor){
		console.log('toProfile')
		profile_email = email;
		if(isTutor == 0){
			$.mobile.changePage("#user_simple");
		}
		else if(isTutor == 1){
			$.mobile.changePage("#tutor_simple");			
		}
		else{
			alert('누구냐 넌');
		}
	};

	this.toBoardList = function(){
		$.mobile.changePage("#board_list");
	}
    this.join_tutor = function(fd, callback){
    	var url = ip+'/member/join_tutor';

        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).
		success(function(data, status, headers, config) {
			console.log(data);
			callback(data);
		}).
		error(function(data, status, headers, config) {
			alert("server error");
			$.mobile.changePage('#home');
		});
    }


    this.join_user = function(fd, callback){
    	var url = ip+'/member/join_tutee';

        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).
		success(function(data, status, headers, config) {
			console.log(data);
			callback(data);
		}).
		error(function(data, status, headers, config) {
			alert("server error");
			$.mobile.changePage('#home');
		});
    }

	this.toBoard = function(board_num){
		board = board_num;
		$.mobile.changePage("#board");
	}

	this.toBoardList = function(board_list){
		board_list = board_list;
		$.mobile.changePage("#board_list");
	}

	this.toCourse = function(course_num){
		course = course_num;
		$.mobile.changePage("#course");
	}

	this.doLogin = function(email,pw,callback){
		console.log(11);
		var url = ip+'/member/login';
		var input = {};
		input.email = email;
		input.pw = pw;

		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getMain = function(page,callback){
		var url = ip+'/board/main';
		var input = {};
		input.page = page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getNotice = function(callback){
		var url = ip+'/message/notice';
		var input = {};
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.sendMessage = function(email,message,callback){
		var url = ip+'/message/send';
		var input = {};
		input.email = email;
		input.content = message;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.readMessage = function(num,callback){
		var url = ip+'/message/read';
		var input = {};
		input.num = num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getAlarm = function(callback){
		var url = ip+'/message/alarm';
		var input = {};
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.delState = function(from,to,callback){
		if(debug){
		console.log('delState in ajax');
		}
		var url = ip+'/community/alarm_relation_del';
		var input = {};
		input.from=from;
		input.to=to;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});		
	}
	this.getRcm_tutor = function(page,callback){
		console.log('rcm_tutor')
		var url = ip+'/member/recommend_tutor';
		var input = {};
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getRcm_user = function(page,callback){
		console.log('rcm_user');
		var url = ip+'/member/recommend_user';
		var input = {};
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}


	this.getMessage = function(page,callback){
		console.log('message');
		var url = ip+'/message/list';
		var input = {};
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getFollowerlist = function(callback){
		var url = ip+'/community/follower_list';
		var input = {};
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getFriendlist = function(callback){
		var url = ip+'/community/friend_list';
		var input = {};
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getSearchUser = function(keyword,page,callback){
		var url = ip+'/search/people';
		var input = {};
		input.keyword = keyword;
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getSearchTutor = function(keyword,page,callback){
		var url = ip+'/search/tutor';
		var input = {};
		input.keyword = keyword;
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}


	this.getSearchCourse = function(keyword,page,callback){
		var url = ip+'/search/course';
		var input = {};
		input.keyword = keyword;
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getTutorSimple = function(email,callback){
		var url = ip+'/users/tutor_simple';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getUserSimple = function(email,callback){
		var url = ip+'/users/user_simple';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getCourse = function(num,callback){
		var url = ip+'/course/info';
		var input = {};
		input.num=num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}


	this.getBoard = function(num,callback){
		var url = ip+'/board/read';
		var input = {};
		input.num=num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getBoardList = function(email,page,callback){
		var url = ip+'/board/list';
		var input = {};
		input.email=email;
		input.page=page;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getTutorDetail = function(email,callback){
		var url = ip+'/users/tutor_detail';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}



	this.reqFriend = function(email,callback){
		var url = ip+'/community/friend_req';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.delFriend = function(email,callback){
		var url = ip+'/community/friend_break';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.reqFollow = function(email,callback){
		var url = ip+'/community/follow_add';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.delFollow = function(email,callback){
		var url = ip+'/community/follow_break';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}



	this.agreeFriend = function(email,callback){
		var url = ip+'/community/friend_agree';
		var input = {};
		input.email=email;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}


	this.delAlarm = function(num,callback){
		var url = ip+'/message/del_alarm';
		var input = {};
		input.num=num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.getProfile = function(callback){
		var url = ip+'/member/getProfile';
		var input = {};
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.reqBoardgood = function(num,callback){
		var url = ip+'/board/good_req';
		var input = {};
		input.grp = num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}


	this.delBoardgood = function(num,callback){
		var url = ip+'/board/good_del';
		var input = {};
		input.grp = num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.reqReviewgood = function(num,callback){
		var url = ip+'/course/review_good';
		var input = {};
		input.grp = num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.delReviewgood = function(num,callback){
		var url = ip+'/course/review_good_del';
		var input = {};
		input.grp = num;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.logout = function(callback){
		var url = ip+'/member/logout';
		var input = {};
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}



	this.writeReview = function(grp,content,callback){
		var url = ip+'/course/review_write';
		var input = {};
		input.grp=grp;
		input.content=content;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

	this.writeComment = function(grp,content,callback){
		var url = ip+'/board/write_comment';
		var input = {};
		input.grp=grp;
		input.content=content;
		$http.post(url, input).
			success(function(data, status, headers, config) {
				console.log(data);
				callback(data);
			}).
			error(function(data, status, headers, config) {
				alert("server error");
				$.mobile.changePage('#home');
			});
	}

    // this.writeBoard = function(fd, callback){
    // 	var url = ip='/board/write'

    //     $http.post(url, fd, {
    //         transformRequest: angular.identity,
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     .success(function(){
    //     	cono
    //     })
    //     .error(function(){
    //     });
    // }


    this.writeBoard = function(fd, callback){
    	var url = ip='/board/write'

        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).
		success(function(data, status, headers, config) {
			console.log(data);
			callback(data);
		}).
		error(function(data, status, headers, config) {
			alert("server error");
			$.mobile.changePage('#home');
		});
    }

    this.writeCourse = function(fd, callback){
    	var url = ip='/course/write'

        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).
		success(function(data, status, headers, config) {
			console.log(data);
			callback(data);
		}).
		error(function(data, status, headers, config) {
			alert("server error");
			$.mobile.changePage('#home');
		});
    }
});

