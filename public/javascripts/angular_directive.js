var sidebar_html ="";
sidebar_html += '<div data-role="panel" id="sidebar" data-display="overlay">'
			+'<div id = "to_home_outer">'
            +'<div class="ui-grid-a" ng-href="#main">'
            +'<div class="ui-block-a" style="width:20%; float:left;">'
            +'<a><img src="/images/menu_home.png" id = "to_home_icon" alt="icon"/></a>'
            +'</div>'
            +'<div id="to_home" class="ui-block-b" style="width:80%; float:left;"><p>홈으로 이동</p></div>'
            +'</div>'
        	+'</div>'
        	+'<div id="my_profile" ng-click="toProfile(profile.email,profile.isTutor)">'
            +'<div class="ui-grid-a">'
			+'<div class="ui-block-a" style="width:40%; vertical-align: middle;  max-height:120px;">'
            +'<img src="/images/mini_normal.jpg" id = "profile_thumbnail" alt="icon" ng-if="profile.thumbnail == undefined"/>'
            +'<img ng-src="{{profile.thumbnail}}" id = "profile_thumbnail" alt="icon" ng-if="profile.thumbnail != undefined"/>'
            +'</div>'
            +'<div class="ui-block-b" style="width:60%; vertical-align: middle; max-height:120px;">'
            +'<p><a id="name">{{profile.name}}</a><a id="address">{{profile.address_gu}}</a></p>'
            +'<div style="line-height: 25px; text-align: left;">'
			+'<div id="subjects" ng-repeat="subject in profile.subjects" ng-if="profile.isTutor">'
			+'<br ng-if="profile.subjects.indexOf(subject)==2"/>'
			+'<a class="subjects">{{subject}}</a>'
			+'</div>'
			+'</div>'

			+'<div ng-if="!profile.isTutor">'
			+'<a id="school">{{profile.school_name}}</a>&nbsp<a id="grade">{{profile.grade}} 학년</a>'
			+'</div></div></div></div>'
			+'<div id="menu_list">'
			+'<ul data-role="listview">'
			+'<li><a href="#rcm_tutor"><img src="/images/menu_a.png">지인을 찾아보세요</a></li>'
			+'<li><a href="#friend_list"><img src="/images/menu_b.png">내 인맥</a></li>'
			+'<li><a href="#alarm"><img src="/images/menu_c.png">알림</a></li>'
			+'<li><a href="#message"><img src="/images/menu_c.png">메세지</a></li>'
			+'<li><a href="#search_user"><img src="/images/menu_c.png">검색</a></li>'
      +'<li><a href="#notice"><img src="/images/menu_d.png">공지사항</a></li>'
      +'<li><a href="#logout"><img src="/images/menu_d.png">로그아웃</a></li>'
			+'</ul></div></div>'

app.directive('sidebar', function() {
    return {
      restrict: 'E',
      template: sidebar_html,
      replace: true
    };
});


app.directive('delDrag', function($document,$compile,$timeout) {
  return {
    restrict: 'A',
    // scope : {
    // 	show : '='
    // },
    link:function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0;
    var width = window.getComputedStyle(element[0],null).width;
    var half = window.getComputedStyle(element[0],null).width.slice(0,window.getComputedStyle(element[0],null).width.length-2)/2;
    // scope.$watch( null, function(){
    // },true);
    element.css({
     position: 'relative',
     cursor: 'pointer',
     display: 'block',
    });


    element.on('mousedown', function(event) {
		console.log(scope);
		// console.log(window.getComputedStyle(element[0],null).width);
		// console.log(window.getComputedStyle(element[0],null).height);
		event.preventDefault();
		startX = event.screenX - x;
		startY = event.screenY - y;
		$document.on('mousemove', mousemove);
		$document.on('mouseup', mouseup);
    });

    var move = function(event){
		x = event.screenX - startX;
		element.css({
		left:  x + 'px'
		});
    }
    var end = function(){
		if(x<=half){
			element.css({
				left:  0 + 'px'
			});
		}
		else{
			element.css({
				left:'100%',
				transition: '300ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all',
			});
			$timeout(function() {
				element.css({
					left:0 + 'px'
				});


				var template = angular.element(
					// '<div class="del-box"><button ng-click="'+attr.func+'">삭제</button><button rollback>취소</button><div>'
					'<div class="ui-grid-b delDrag">'+
					'<div class="ui-block-a" style="width:60%;">삭제하시겠습니까?</div>'+
					'<div class="ui-block-b" style="width:20%;">'+
					'<button class="delBtn" ng-click="'+attr.delDrag+'">삭제</button>'+
					'</div>'+
					'<div class="ui-block-c" style="width:20%;"></div>'+
					'<button class="rollbackBtn" rollback>취소</button>'+
					'</div>'
					)
							// <button class="reqFriendBtn" ng-click="reqFriend(recommend.email)" ng-if="!recommend.isFriend" ng-init="recommend.isFriend=0">친구 추가</button>
			    //                     <button class="delFriendBtn" ng-click="delFriend(recommend.email)" ng-if="recommend.isFriend">친구 요청중</button>
				template[0].origindiv = element[0].outerHTML; 
				template.css({
					width : window.getComputedStyle(element[0],null).width,
					height : window.getComputedStyle(element[0],null).height,
					margin : window.getComputedStyle(element[0],null).margin
				});

				// element.attr('ng-show','show');
				// $compile(element)(scope);

				var linkFunction = $compile(template);
			    // element.removeAttr('del-drag');
				linkFunction(scope);
				element.replaceWith( template );
				// element.after(template);
				// scope.$apply();



				scope.$apply();
			}, 300);
		}		
		startX = 0, startY = 0, x = 0, y = 0;

    }
    function mousemove(event) {
      event.preventDefault();
      move(event);
    }
    function mouseup() {
    	end();
		$document.off('mousemove', mousemove);
		$document.off('mouseup', mouseup);
    }

    var touch = {};
    element.on('touchstart', function(event) {
      touch = event.originalEvent.touches[0];
      event.preventDefault();
      startX = touch.screenX - x;
      $document.on('touchmove', touchmove);
      $document.on('touchend', touchend);
    });
    function touchmove(event) {
      event.preventDefault();
	  touch = event.originalEvent.touches[0];
	  move(touch);
    }
    function touchend() {
    	end();
		$document.off('touchmove', touchmove);
		$document.off('touchend', touchend);
    }
  }
};
});

app.directive('rollback', function($document,$compile) {
  return {
    restrict: 'A',
    link : function(scope, element, attr) {
      element.on('click', function(event) {

      	event.preventDefault();
      	var template = angular.element(element.parent()[0].origindiv);

		$compile(template)(scope);
		element.parent().replaceWith( template );
		scope.$apply();
      })
    }
  }
});

// app.directive('rollback', function($document,$compile) {
//   return {
//     restrict: 'A',
//     link : function(scope, element, attr) {
//       element.on('click', function(event) {
//       			event.preventDefault();
//       	console.log(1);
//                   // console.log(element.parent()[0].origindiv);
//         var template = angular.element(element.parent()[0].origindiv);

// 		var linkFunction = $compile(template);

// 		// //3단계: 스코프를 컴파일한 템플릿과 연결한다.
// 		linkFunction(scope);
// 		// console.log("rollback",scope);
// 		//4단계: HTML 요소를 반영한다.
// 		// element.html(null).append( template );
// 		// console.log(element.parent());
// 		element.parent().replaceWith( template );
// 		scope.$apply();
//       })
//     }
//   }
// });



app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                	console.log(element[0].files[0]);
                });
            });
        }
    };
}]);



app.directive('slideit',function() {
    return {
       restrict: 'A',
       replace: true,
       scope: {
         slideit: '=' 
       },
       template: '<ul class="bxslider">' +
                   '<li ng-repeat="slide in slides">' +
                     '<img ng-src="{{slide}}" alt="" />' +
                   '</li>' +
                  '</ul>',
       link: function(scope, elm, attrs) {
          elm.ready(function() {
            scope.$apply(function() {
                scope.slides = scope.slideit;
            });                    
            elm.bxSlider({
              adaptiveHeight: true,
              mode: 'fade'});   
            });
       }
    }; 
});