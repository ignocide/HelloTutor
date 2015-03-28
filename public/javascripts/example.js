app.factory('userinfo', function() {
	//유저 공통
    var userinfo = {};
   	userinfo.firstname = "";
   	userinfo.lastname = "";
   	userinfo.email="";
   	userinfo.pw="";
    return userinfo;
});


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

		if(isEmpty($scope.user.firstname,no_firstname)){}
		else if(isEmpty($scope.user.lastname,no_lastname)){}
		else if(isEmpty($scope.user.email,no_email)){}
		else if(!$scope.email_ch){
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
		else
			$.mobile.changePage("#join_choose");
	}
	//원하는 기능, 아래와 같은 기능을 하고 중복되는 function들을 
	//기능,성격에 따라 따로 분류하여 관리하고 싶습니다.


	//해당 스코프? 를 가져와서 빈 값인지를 체크하고 빈값이라면 warning massge popup
	var isEmpty = function(target,msg){
		if(target == ""){
			//warning팝업 메세지 set
			$scope.warning_msg=msg;
			//mobile jquery에서 팝업
			$("#warning").popup("open");
			return true;
		}
		else return false;
	}


	//해당 $scope.warning도 따로 받아 입력을 받는 작업이 안됩니다.
	//즉 스코프의 값을 가져오는 데에 있어서 아무런 문제가 없지만
	//스코프의 값을 변경할 수가 없습니다.
	//즉 l-value가 아닌 r-value를 반환하는듯 합니다.
	var isEmpty2 = function(target,warning,msg){
		if(target == ""){
			warning=msg;
			$("#warning").popup("open");
			return true;
		}
		else return false;
	}
});


//제가 원하는 기능을 할 수 있는 서비스 또는 팩토리로 묶어 사용을 하고자 할수 있겠지만
//아래와 같이 만들어 사용할 경우 isEmpty2와 같은 문제가 발생합니다.
app.service('loginService', function()
{
	this.isEmpty3 = function(target,msg_scope,msg)
	{
		if(target == ""){
			alert("aa");
			msg_scope=msg;
			$("#warning").popup("open");
			return true;
		}
		else return false;
	};
});
