var check_email = function(eamil,email_ch,msg_scope){
	alert(11);
	var url = '/users/check_email';
	var input = {};
	input.email = email;

	$.post(url,input,function(data){
	    if(data.isExist >= 1){
	    	email_ch=false;
	        $("#warning").popup("open");
	    }
	    else{
	    	email_ch=true;
	    }
	},"json");
}

var isEmpty = function(scope,msg){

}