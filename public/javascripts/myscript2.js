// $(document).on('pageshow','#main',function(){

// });

var post_to_url = function (path, params, method) {
    method = method || "post"; // 전송 방식 기본값을 POST로
 
    
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
 
    //히든으로 값을 주입시킨다.
    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
 
        form.appendChild(hiddenField);
    }
 
    document.body.appendChild(form);
    form.submit();
}


var loginProc = function (){
    var input = {};
    input.email = $('#login_email').val();
    input.pw = $('#login_pw').val();
    // alert(1);
    var url = 'http://54.65.219.91/member/login';

    // $.post(url,input,function(data){
    //  alert(1);
    //  if(data.isSuccess == 1){
    //      alert(1);
    //      // $.mobile.changePage("#home");
    //  }
    //  else{
    //      alert(data.message);
    //  }
    // },"json");

    $.ajax({
        type:"POST",
        url:url,
        async:false,
        data:input,
        success:function(data){
            console.log(data);
            if(data.isSuccess == 1){
                $.mobile.changePage("#home");
                // location.replace('#home')
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}

function joinProc(){
    // alert($("#pw").val());
    if($("#pw").val() == $("#pw_re").val()){
        $.mobile.changePage("#join_choose");
        // location.href="#join_choose";
    }
}


// var joinProc_tutor = function(){
//     var input ={};
//     input.first_name = $('#first_name').val();
//     input.last_name = $('last_name').val();
//     input.email = $('#email').val();
//     input.pw =  $('#password').val();
//     input.birthday = $('#birthday').val();
//     input.gender = $('#gender').val();
//     input.address_si = $('#address_si').val();
//     input.address_gu = $('#address_gu').val();


// }
$(document).on('pageshow','#join_tutor',function(){
    // console.log("ㅎㅇ");
    $("#tutor_name").val($("#last_name_1").val() + $("#first_name_1").val());
    $("#tutor_email").val($("#email_1").val());
    $("#last_name").val($("#last_name_1").val());
    $("#first_name").val($("#first_name_1").val());
    $('#email').val($('#email_1').val());
    $('#pw').val($('#pw_1').val());
    alert($('#pw').val());
});


$(document).on('pageshow','#join_user',function(){
    // console.log("ㅎㅇ");
    $("#tutee_name").val($("#last_name_1").val() + $("#first_name_1").val());
    $("#tutee_email").val($("#email_1").val());
    $("#last_name_user").val($("#last_name_1").val());
    $("#first_name_user").val($("#first_name_1").val());
    $('#email_user').val($('#email_1').val());
    $('#pw_user').val($('#pw_1').val());
    // alert($('#pw_user').val());
});

$(function(){
    $("#main").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#recommend_tutor").bind("swiperight", function(){
        $("#sidebar").panel("open");
    }),
    $("#recommend_tutor").bind("swipeleft", function(){
        location.href="/member/recommend_user/1";
    }),
    $("#recommend_user").bind("swiperight", function(){
        location.href="/member/recommend_tutor/1";
    }),
    $("#tutor_simple").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),    
    $("#friend_list").bind("swipeleft", function () {
        location.href="/community/follower_list";
    }),
    $("#follower_list").bind("swiperight", function () {
        location.href="/community/friend_list";
    }),
    $("#board_read").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#course_info").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#alram_list").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#message_list").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#notice_list").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#search_user").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#tutor_simple").bind("swiperight", function () {
        $("#sidebar").panel("open");
    }),
    $("#user_simple").bind("swiperight", function () {
        $("#sidebar").panel("open");
    });
});


var friend_req_main = function(target,index){
    var url = '/community/friend_req';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            if(data.isSuccess == 1){
                $('#friend_del_'+index).css("display","block");
                $('#friend_req_'+index).css("display","none");
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}





var del_req_main = function(target,index){
    var url = '/community/friend_break';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            console.log(data);
            if(data.isSuccess == 1){
                $('#friend_req_'+index).css("display","block");
                $('#friend_del_'+index).css("display","none");
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
};



var del_req_friend_list = function(target,index){
    var url = '/community/friend_break';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            console.log(data);
            if(data.isSuccess == 1){
                $('#friend_req_'+index).css("display","none");
                // $('#friend_del_'+index).css("display","none");
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
};

var read_state = function(from,to,index){
        var url = '/community/alram_relation_del';
    var input = {};
    input.from = from;
    input.to = to;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            console.log(data);
            if(data.isSuccess == 1){
                $('#state_'+index).css("display","none");
                // $('#friend_del_'+index).css("display","none");
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}
var profile = function(email,isTutor){
    if(isTutor == 1){
        location.href="/users/tutor_simple/"+email;
    }
    else if(isTutor == 0){
        location.href="/users/tutee_simple/"+email;
    }
    else{
        alert("누구냐 넌");
    }
};


var show_cmt_form = function(){
    if($('#cmt_form').css("display") == "block"){
        // alert(1);
        $('#cmt_form').hide(300,function(){

        });
    } else
        $('#cmt_form').show("fast");

}



$(document).on('pageshow','#board_read',function(){
    // alert(<%=board.isGood%>);
});

var board_good_req = function (grp,good){
    var input = {};
    input.grp = grp;
    // alert(1);
    var url = '/board/good_req';
    // alert($("#good").text());
    $.post(url,input,function(data){
     if(data.isSuccess == 1){
        $("#good").text("좋아요 취소 "+(good+1)+"개");
        $("#good").attr('onclick', 'board_good_del('+grp+','+good+')');
     }
     else{
         alert(data.message);
     }
    },"json");
}

var board_good_del = function (grp,good){
    var input = {};
    input.grp = grp;

    // alert(1);
    var url = '/board/good_del';
    // alert($("#good").text());
    $.post(url,input,function(data){
     if(data.isSuccess == 1){
        $("#good").text("좋아요"+(good)+"개");
        $("#good").attr('onclick', 'board_good_req('+grp+','+good+')');
     }
     else{
         alert(data.message);
     }
    },"json");
}






var show_review_form = function(){
    if($('#review_form').css("display") == "block"){
        // alert(1);
        $('#review_form').hide(300,function(){

        });
    } else
        $('#review_form').show("fast");

}




var review_good_req = function (grp,good,index){
    var input = {};
    input.grp = grp;
    // alert(1);
    var url = '/course/review_good';
    // alert($("#good").text());
    $.post(url,input,function(data){
        // alert(data.isSuccess);
     if(data.isSuccess == 1){
        $("#review_good_"+index).text("좋아요 "+(good+1)+"개");
        $("#review_good_btn_"+index).text("좋아요 취소");
        $("#review_good_btn_"+index).attr('onclick', 'review_good_del('+grp+','+good+','+index+')');
     }
     else{
         alert(data.message);
     }
    },"json");
}

var review_good_del = function (grp,good,index){
    var input = {};
    input.grp = grp;

    // alert(1);
    var url = '/course/review_good_del';
    // alert($("#good").text());
    $.post(url,input,function(data){
        alert(data.isSuccess);
     if(data.isSuccess == 1){
        $("#review_good_"+index).text("좋아요 "+(good)+"개");
        $("#review_good_btn_"+index).text("좋아요");
        $("#review_good_btn_"+index).attr('onclick', 'review_good_req('+grp+','+good+','+index+')');
     }
     else{
         alert(data.message);
     }
    },"json");
}


var send_message = function(to){
    var url = '/message/send';
    var input = {};
    input.email = to;
    input.content = $('#message').val();
    $.post(url,input,function(data){
        console.log(data);
     if(data.isSuccess == 1){
        console.log(data);
        $( "#send_message" ).popup( "close" );
     }
     else{
         alert(data.message);
     }
    },"json");
}


var message_target;
var open_message_frm = function(to){
    message_target = to;
    $( "#send_message" ).popup( "open" );
}

var send_response = function(){
    var url = '/message/send';
    var input = {};
    input.email = message_target;
    input.content = $('#message').val();
    $.post(url,input,function(data){
     if(data.isSuccess == 1){
        $( "#send_message" ).popup( "close" );
     }
     else{
         alert(data.message);
     }
    },"json");
}

var del_target_message;
var del_message_dialog = function(num){
    del_target_message = num;

    $( "#del_dialog" ).popup( "open" );
}

var del_message = function(){
    var url = '/message/delete';
    var input = {};
    input.num = del_target_message;
    $.post(url,input,function(data){
     if(data.isSuccess == 1){
        $( "#num_"+del_target_message).hide(300,function(){});
        $( "#del_dialog" ).popup( "close" );
     }
     else{
         alert(data.message);
     }
    },"json");
}

$(document).ready(function() {
    $("#photo_0").change(function(){
        if($("#photo_0").val() != "")
            $("#photo_1").show("fast");
        if($("#photo_0").val() == "")
            $('#photo_1').hide(300,function(){
                $('#photo_1').val()="";
            })
    });
    $("#photo_1").change(function(){
        if($("#photo_1").val() != "")
            $("#photo_2").show("fast");
        if($("#photo_1").val() == "")
            $('#photo_2').hide(300,function(){
                $('#photo_2').val()="";
            })
    });
    $("#photo_2").change(function(){
        if($("#photo_2").val() != "")
            $("#photo_3").show("fast");
        if($("#photo_2").val() == "")
            $('#photo_3').hide(300,function(){
                $('#photo_3').val()="";
            })
    });

    $("#photo_3").change(function(){
        if($("#photo_3").val() != "")
            $("#photo_4").show("fast");
        if($("#photo_3").val() == "")
            $('#photo_4').hide(300,function(){
                $('#photo_4').val()="";
            })
    });
    $("#photo_4").change(function(){
        if($("#photo_4").val() != "")
            $("#photo_5").show("fast");
        if($("#photo_4").val() == "")
            $('#photo_5').hide(300,function(){
                $('#photo_5').val()="";
            })
    });
    $("#photo_5").change(function(){
        if($("#photo_5").val() != "")
            $("#photo_6").show("fast");
        if($("#photo_5").val() == "")
            $('#photo_6').hide(300,function(){
                $('#photo_6').val()="";
            })
    });
    $("#photo_6").change(function(){
        if($("#photo_6").val() != "")
            $("#photo_7").show("fast");
        if($("#photo_6").val() == "")
            $('#photo_7').hide(300,function(){
                $('#photo_7').val()="";
            });
    });
    $("#photo_7").change(function(){
        if($("#photo_7").val() != "")
            $("#photo_8").show("fast");
        if($("#photo_7").val() == "")
            $('#photo_8').hide(300,function(){
                $('#photo_8').val()="";
            })
    });

    $("#photo_8").change(function(){
        if($("#photo_8").val() != "")
            $("#photo_9").show("fast");
        if($("#photo_8").val() == "")
            $('#photo_9').hide(300,function(){
                $('#photo_9').val()="";
            })
    });
    // alert(11);
    $("#subjects_0").change(function(){
        // alert(11);
        if($("#subjects_0").val() != "")
            $("#subjects_1").show("fast");
        if($("#subjects_0").val() == "")
            $('#subjects_1').hide(300,function(){
                $('#subjects_1').val()="";
            })
    });

    $("#subjects_1").change(function(){
        if($("#subjects_1").val() != "")
            $("#subjects_2").show("fast");
        if($("#subjects_1").val() == "")
            $('#subjects_2').hide(300,function(){
                $('#subjects_2').val()="";
            })
    });

    $("#subjects_2").change(function(){
        if($("#subjects_2").val() != "")
            $("#subjects_3").show("fast");
        if($("#subjects_2").val() == "")
            $('#subjects_3').hide(300,function(){
                $('#subjects_3').val()="";
            })
    });

    var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;


    $("#email_1").change(function(){
        if(!regEmail.test($("#email_1").val())) {
              $("#warning_email2").popup("open");
              return false;
      }else{
            var url = '/users/check_email';
            var input = {};
            input.email = $("#email_1").val();
            $.post(url,input,function(data){
                if(data.isExist >= 1){
                    $("#email_ch").val("false");
                    $("#warning_isExist").popup("open");
                }
                else{
                    $("#email_ch").val("true");
                }
            },"json");


      }

    });

})

var board_writeProc = function(){
    if($("#title").val()==""){
        alert("제목을 입력해주세요");
        return false;
    } else if($("#content").val()==""){
        alert("내용을 입력하세요");
        return false;
    } else{
        $("#writefrm").submit();
    }
}


var subject_index;

var subject_popup = function(index){
    subject_index = index;
    $("#subject_list").popup("open");
}

var setSubject = function(subject){
    $("#subjects_"+subject_index).val(subject);
    if(subject_index<3){
        if($("#subjects_"+subject_index).val() != "")
            $("#subjects_"+(subject_index+1)).show("fast");
        if($("#subjects_"+subject_index).val() == "")
            $('#subjects_'+(subject_index+1)).hide(300,function(){
                $('#subjects_'+(subject_index+1)).val("");
            })
    }
    $("#subject_list").popup("close");
}

var setAddress_si = function(si){
    $("#address_si").val(si);
    $("#address_si_list").popup("close");   
}

var setAddress_gu = function(gu){
    $("#address_gu").val(gu);
    $("#address_gu_list").popup("close");       
}



var setAddress_si_user = function(si){
    $("#address_si_user").val(si);
    $("#address_si_list2").popup("close");   
}

var setAddress_gu_user = function(gu){
    $("#address_gu_user").val(gu);
    $("#address_gu_list2").popup("close");       
}




var course_writeProc = function(){
    if($("#title").val()==""){
        alert("제목을 입력해주세요");
        return false;
    } else if($("#content").val()==""){
        alert("내용을 입력하세요");
        return false;
    } else{
        $("#writefrm").submit();
    }
}


function join_common() {

    // var check_Eng= /[a-z]|[A-Z]/;
    // var check_Num= /[0-9]/;
    // var check_NuEng= /[0-9]|[a-z]|[A-Z]/;
    // var check_kor = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
    // var check_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    var regPw = /^[a-zA-Z0-9]{6,13}$/;
    var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;


    if($("#first_name_1").val() == ""){
          $("#warning_firstname").popup("open");
          return false;
     }

   if($("#last_name_1").val() == ""){
        $("#warning_lastname").popup("open");
        return false;
    }

   if( $("#email_1").val() == ""){
              $("#warning_email1").popup("open");
              return false;
      } else if(!regEmail.test($("#email_1").val())) {
              $("#warning_email2").popup("open");
              return false;
      }

    if( $("#email_ch").val() == "false"){
        $("#warning_isExist").popup("open");
        return false;
    }

     if($("#pw_1").val() ==""){
        $("#warning_pw").popup("open");
        return false;
      }
     
     if(!regPw.test($("#pw_1").val())) {
        $("#warning_pw2").popup("open");
       return false;
     }

     if($("#pw_re").val() ==""){
        $("#warning_pw_re").popup("open");
        return false;
     }

     if($("#pw_1").val() != $("#pw_re").val()){
        $("#warning_pw_match").popup("open");
        return false;
     }



    $.mobile.changePage("#join_choose");
}









var alarm_num;
var req_reject;
var req_agree;
var del_alarm_dialog = function(alarm){
    alarm_num = alarm ;

    $( "#del_dialog" ).popup( "open" );
}



var del_alarm = function(){
    var input = {};
    input.num = alarm_num;

    var url = "/message/del_alarm";
    $.post(url,input,function(data){
     if(data.isSuccess == 1){
        $( "#num_"+alarm_num).hide(300,function(){});
        $( "#del_dialog" ).popup( "close" );
     }
     else{
         alert(data.message);
     }
    },"json");
}




var reject_alarm_dialog = function(alarm,reject){
    alarm_num = alarm;
    req_reject = reject;
    $( "#req_reject" ).popup( "open" );

}




var reject_alarm = function(){
    var input = {};
    input.num = alarm_num;

    var url = "/message/del_alarm";
    $.post(url,input,function(data){
        if(data.isSuccess == 1){
            var input2 = {};
            input2.email = req_reject;
                var url2 = "/community/friend_break";
            $.post(url2,input2,function(data){
                if(data.isSuccess == 1){
                    $( "#num_"+alarm_num).hide(300,function(){});
                    $( "#del_dialog" ).popup( "close" );
                }
                else{
                    alert(data.message);
                }
            },"json");
        }
        else{
            alert(data.message);
        }
    },"json");
}



var agree = function(alarm,agree){
    alarm_num = alarm;
    req_agree = agree;
    $( "#req_reject" ).popup( "open" );

}



var agree_alarm = function(){
    var input = {};
    input.num = alarm_num;

    var url = "/message/del_alarm";
    $.post(url,input,function(data){
        if(data.isSuccess == 1){
            var input2 = {};
            input2.email = req_reject;
                var url2 = "/community/friend_break";
            $.post(url2,input2,function(data){
                if(data.isSuccess == 1){
                    $( "#num_"+alarm_num).hide(300,function(){});
                    $( "#del_dialog" ).popup( "close" );
                }
                else{
                    alert(data.message);
                }
            },"json");
        }
        else{
            alert(data.message);
        }
    },"json");
}
















var friend_req = function(target){
    var url = '/community/friend_req';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            if(data.isSuccess == 1){
                $("#friend_btn").val("친구 ...");
                $("#friend_btn").attr('onclick', 'friend_break(\''+target+'\')');
                $("#friend_btn").button("refresh");
                
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}


var friend_break = function(target){
    var url = '/community/friend_break';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            if(data.isSuccess == 1){
                $("#friend_btn").val("친구 X");
                $("#friend_btn").attr('onclick', 'friend_req(\''+target+'\')');
                $("#friend_btn").button("refresh");
                
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}



var follow_req = function(target){
    var url = '/community/follow_add';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            if(data.isSuccess == 1){
                $("#follow_btn").val("팔 로 우 ∨");
                $("#follow_btn").attr('onclick', 'follow_break(\''+target+'\')');
                $("#follow_btn").button("refresh");
                
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}

var follow_break = function(target){
    var url = '/community/follow_break';
    var input = {};
    input.email = target;
    $.ajax({
        type:"POST",
        url:url,
        data:input,
        success:function(data){
            if(data.isSuccess == 1){
                $("#follow_btn").val("팔 로 우 X");
                $("#follow_btn").attr('onclick', 'follow_req(\''+target+'\')');
                $("#follow_btn").button("refresh");
                
            }
            else{
                alert(data.message);
            }
        },
        dataType:"JSON",
        error: function (req,state,error) {
            alert(error);
        }
    });
}

function search_people(){
    var input = {};
    input.keyword = $("#keyword1").val();
    console.log(11);
    var url = "/search/people";
    $.post(url,input,function(data){
        if(data.isSuccess == 1){
    console.log(11);
                console.log(data);
            add_search_people(data);
        }
        else{
            alert(data.message);
        }
    },"json");
}


function add_search_people(data){
    var items = data.list;
    // var totalCount = data.totalCount;
    var output = '';
    for(var i = 0;i<items.length;i++){
        var item = items[i];
        output +='<li>';
        output +='<div class="user">';
        output +='<div class="ui-grid-a">';
        output +='<div class="ui-block-a" style="width:30%;" onclick="profile(\''+item.email+'\',0)">';
        output +='<a>'
        if(item.thumbnail == null)
            output +='<img src="/images/mini_normal.jpg"/>'
        else
            output +='<img src="'+item.thumbnail+'"/>'
        output += '</a></div>'
        output +='<div class="ui-block-b" style="width:70%;" onclick="profile(\''+item.email+'\',0)">'
        output +='<div class="user_info">'
        output +='<a class="user_name">'+item.name+'</a><br/>'
        if(item.together != null)
            output +='<a class="user_together">함께아는 친구 '+item.together+'명</a><br/>';
        if(item.school_name != null)
            output +='<a class="user_school">'+item.school_name+' '+item.grade+'학년</a>';
        else
            output += '<a class="user_address">'+item.address_si+' '+item.address_gu+'</a>'    
        output += '</div></div></div></div></li>'
    }
    $("#user_list").html(output);
    $('#user_list').listview('refresh');
};








function search_tutor(){
    var input = {};
    input.keyword = $("#keyword2").val();
    console.log(11);
    var url = "/search/tutor";
    $.post(url,input,function(data){
        if(data.isSuccess == 1){
    console.log(11);
                console.log(data);
            add_search_tutor(data);
        }
        else{
            alert(data.message);
        }
    },"json");
}


function add_search_tutor(data){
    var items = data.list;
    // var totalCount = data.totalCount;
    var output = '';
    for(var i = 0;i<items.length;i++){
        var item = items[i];
        output +='<li>';
        output +='<div class="user">';
        output +='<div class="ui-grid-a">';
        output +='<div class="ui-block-a" style="width:30%;" onclick="profile(\''+item.email+'\',1)">';
        output +='<a>'
        if(item.thumbnail == null)
            output +='<img src="/images/mini_normal.jpg"/>'
        else
            output +='<img src="'+item.thumbnail+'"/>'
        output += '</a></div>'
        output +='<div class="ui-block-b" style="width:70%;" onclick="profile(\''+item.email+'\',1)">'
        output +='<div class="user_info">'
        output +='<a class="user_name">'+item.name+'</a><br/>'
        if(item.together != null)
            output +='<a class="user_together">함께아는 친구 '+item.together+'명</a><br/>';
        for(var j = 0;j<item.subjects.length;j++){
            output +='<a class="subjects">'+item.subjects[j]+'</a>';
        }
        // output += '<a class="user_address">'+item.address_si+' '+item.address_gu+'</a><br/>'    
        output += '</div></div></div></div></li>'
    }
    $("#tutor_list").html(output);
    $('#tutor_list').listview('refresh');
};







function search_course(){
    var input = {};
    input.keyword = $("#keyword3").val();
    console.log(11);
    var url = "/search/course";
    $.post(url,input,function(data){
        if(data.isSuccess == 1){
    console.log(11);
                console.log(data);
            add_search_course(data);
        }
        else{
            alert(data);
        }
    },"json");
}

function add_search_course(data){
    var items = data.list;
    // var totalCount = data.totalCount;
    var output = '';
    for(var i = 0;i<items.length;i++){
        var item = items[i];
        // output +='<li>';
        output +='<div class="course" style="margin : 10px; box-shadow:5px 5px 10px #cccccc;">';
        output +='<div class="board_header" onclick="profile(\''+item.email+'\',1)" ><div class="ui-grid-b" id="write_profile">';
        output +='<div class="ui-block-a" style="width:15%;">';
        if(item.actor_thumbnail == null)
            output += '<img src="/images/mini_normal.jpg" id = "to_profile" alt="to_profile" style="height: 30px;"/>';
        else
            output += '<img src="'+item.user_thumbnail+'" id = "to_profile" alt="to_profile" style="height: 30px;"/>';
        output += '</div>';
        output += '<div class="ui-block-b" style="width:85%;">'
        output +=  '<a id="board_name">'+item.name+'</a><a style="float: right">'+item.regdate+'</a></div>'
        output += '</div></div>'
        output += '<div class="board_content" onclick="location.href=\'/course/info/'+item.num+'\'">'
        if(item.thumbnail != null) {
            output += '<div class="ui-grid-a" id="recommend_profile"><div class="ui-block-a" style="width:40%;">'
            output += '<img src="'+item.thumbnail+'" id = "course_thumbnail" alt="course_thumbnail"/>';
            output += '</div><div class="ui-block-b" style="width:60%;"><div id="board_content_inner">';
            output += '<div id="course_title">'+item.title+'</div><a>'+item.content+'</a></div></div></div>';
        }
        else{
            output += '<div id="board_content_inner"><div id="course_title">'+item.title+'</div>'
            output += '<a>'+item.content+'</a>        </div>'
        }
        output +='</div></div>';
    }
    $("#course_list").html(output);
    // $('#course_list').listview('refresh');
};


var friend_agree = function(target,num){
    var input = {};
    input.email = target;

    var url = "/community/friend_agree";
    $.post(url,input,function(data){
        if(data.isSuccess == 1){
            $('#num_'+num).hide(300,function(){});
        }
        else{
            alert(data.message);
        }
    },"json");
}