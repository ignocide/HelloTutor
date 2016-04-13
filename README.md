hello tutor
================
**Libraries**

	jquery, jquery mobile
	
**Data Stores**

	redis(session server)
	mysql

**Languages & Frameworks**

	Angular : view
	node - express
	javascript

**Server**

	AWS EC2
	
____

## 서비스 설명

![service_1](https://github.com/ignocide/HelloTutor/blob/master/readme/service1.png)
![service_2](https://github.com/ignocide/HelloTutor/blob/master/readme/service2.png)

##DataBase structure

![db structure](https://github.com/ignocide/HelloTutor/blob/master/readme/db.png)

##todo list

	프로필 수정(작성) 기능 연결

	완료 - 비밀번호 수정, 연결하기(기능완성)
	완료 - 검색 페이지에서 친구 추가 버튼 없애기(친구 추가는 프로필 이동 후 추가 버튼)

##etc
	#서비스 주소
	~~54.65.219.91~~(폐쇠)
	
	#폴더별 설명
	view : ejs파일들, view관련된 파일 들이 있다.
	view/home.ejs : 서비스 페이지(원페이지 탬플릿 방식)
	
	database : database 모듈들
	database/sql.js : sql문
	database/msg.js : 에러메세지 처리 모듈
	
	public/javascript : 모든 html의 js파일
	public/javascript/angular-directive.js : angular directive 파일
	public/javascript/angular-functions.js : 기능 함수들, 주로 ajax통신
	public/javascript/photo.js : 사진 처리 모듈
	
	
