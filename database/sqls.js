//이메일, 이메일, 이메일, 시작번호
exports.fail = {
"isSuccess" : 0
};

exports.success = {
"isSuccess" : 1
};

//exports.recommend_user = "select recommend.email, info.name,0 as isTutor, info.thumbnail,info.address_si,info.address_gu, info.school_name, info.grade, sum(score) as score, sum(together) as together " +
//    "from (" +
//    "select u2.email, 1 as score, 0 as together " +
//    "from stu_info u1,stu_info u2 " +
//    "where u1.email = ? " +
//    "and u1.address = u2.address " +
//    "and u1.age = u2.age " +
//    "and u2.email <> ? " +
//    "union all " +
//    "select u2.email, 1 as score, 0 as together " +
//    "from user u1,user u2 " +
//    "where u1.email = ? " +
//    "and u1.school_name = u2.school_name " +
//    "and u2.email <> ? " +
//    "union all " +
//    "select friend2, sum(score*0.2) as score, count(friend2) as together " +
//    "from friend_list " +
//    "where friend1 in (select friend2 from friend_list " +
//    "where friend1 = ?) " +
//    "and friend2 <> ? " +
//    "group by friend2) recommend join stu_info info " +
//    "on recommend.email = info.email " +
//    "group by recommend.email " +
//    "order by score desc " +
//    "limit ?,?";
exports.recommend_user = "select recommend.email, info.name,0 as isTutor, info.thumbnail,info.address_si,info.address_gu, info.school_name, info.grade, sum(score) as score, sum(together) as together   from (    select u2.email, 1 as score, 0 as together " +
    "from stu_info u1,stu_info u2 " +
    "where u1.email = ? " +
    "and u1.address = u2.address " +
    "and u1.age = u2.age " +
    "and u2.email <> ? " +
    "union all " +
    "select u2.email, 1 as score, 0 as together " +
    "from user u1,user u2 " +
    "where u1.email = ? " +
    "and u1.school_name = u2.school_name " +
    "and u2.email <> ? " +
    "union all " +
    "select friend2 as email, score, together " +
    "from recommend_duple " +
    "where friend1 = ?) recommend join stu_info info " +
    "on recommend.email = info.email " +
    "where recommend.email not in (select friend2 from friend_list2 WHERE friend1 = ?) " +
    "group by recommend.email " +
    "order by score desc " +
    "limit ?,?";

//아이디, 아이디, 시작번호
//exports.recommend_tutor = "select recommend.email, info.name,1 as isTutor, info.thumbnail,info.address_si,info.address_gu, sum(score) as score, sum(together) as together " +
//    "from ( " +
//    "select u2.email, 1 as score, 0 as together " +
//    "from user_info u1,user_info u2 " +
//    "where u1.email = ? " +
//    "and u1.address = u2.address " +
//    "and u2.email <> ? " +
//    "union all " +
//    "select friend2, sum(score*0.2) as score, count(friend2) as together " +
//    "from friend_list " +
//    "where friend1 in (select friend2 from friend_list " +
//    "where friend1 = ?) " +
//    "and friend2 <> ? " +
//    "group by friend2) recommend join user_info info " +
//    "on recommend.email = info.email " +
//    "where info.isTutor = '1' " +
//    "group by recommend.email " +
//    "order by score desc " +
//    "limit ?, ?";

//사용자,사용자,사용자,사용자,0,2
exports.recommend_tutor = "select recommend.email, info.name,1 as isTutor, info.thumbnail,info.address_si,info.address_gu, sum(score) as score, sum(together) as together " +
    "from ( " +
    "select u2.email, 1 as score, 0 as together " +
    "from user_info u1,user_info u2 " +
    "where u1.email = ? " +
    "and u1.address = u2.address " +
    "and u2.email <> ? " +
    "union all " +
    "select friend2 as email, score, together " +
    "from recommend_duple " +
    "where friend1 = ?) recommend join user_info info " +
    "on recommend.email = info.email " +
    "where info.isTutor = '1' " +
    "and recommend.email not in (select friend2 from friend_list2 WHERE friend1 = ?) " +
    "group by recommend.email " +
    "order by score desc " +
    "limit ?, ?;";

exports.getSubject = "select subjects from tutor_subject " +
                        "where email = ?;";


//이메일
exports.relation_alram = "select r.from as friend_from, u1.name as friend_from_name, u1.thumbnail as friend_from_thumbnail, " +
                                "r.to as friend_to, u2.name as friend_to_name, u2.thumbnail as friend_to_thumbnail,u2.isTutor " +
                                "from alram_relation r, user_info u1,user_info u2 " +
                                "where r.from = u1.email " +
                                "and   r.to = u2.email " +
                                "and   r.receiver  = ? " +
                                "and   r.receive_yn = 'n' " +
                                "order by regdate desc;";


//사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,페이지
//exports.getFeed = "SELECT feed.isboard, feed.cate, feed.num, feed.actor,u1.isTutor AS isTutor, u1.name AS actor_name, u1.thumbnail AS actor_thumbnail, feed.writer ,u2.isTutor AS iswriterTutor, u2.name AS writer_name, u2.thumbnail AS writer_thumbnail, feed.title, feed.content, feed.good, feed.cmt, feed.isGood, feed.regdate, feed.actdate, feed.acc_date " +
//    "FROM( " +
//    "SELECT 1 AS isBoard, feed.cate, feed.num, feed.actor, b.email AS writer, b.title, b.content, b.thumbnail, feed.good, feed.cmt,feed.isGood, b.regdate, feed.actdate, DATE_ADD(b.regdate,INTERVAL 12*LOG(10,(feed.cmt*2)+(feed.good)) HOUR) AS acc_date " +
//    "FROM (SELECT b.cate,b.num,b.actor,b.actdate, b.good, count(g.email) AS cmt, b.isGood " +
//    "FROM(SELECT b.cate,b.num,b.actor,b.actdate, b.good, count(g.email) AS isGood " +
//    "FROM(SELECT b.cate,b.num,b.actor,b.actdate, count(g.email) AS good " +
//    "FROM(SELECT b.cate,b.num,b.actor,b.actdate " +
//    "FROM( SELECT cate,num,actor,actdate " +
//    "FROM(SELECT cate, num, actor,regdate AS actdate " +
//    "FROM board_log " +
//    "WHERE actor IN   (SELECT friend2 AS feeder " +
//    "FROM friend_list " +
//    "WHERE friend1 = ?) " +
//    "UNION ALL " +
//    "SELECT 3 AS cate, num, email AS actor, regdate AS actdate " +
//    "FROM board " +
//    "WHERE email IN   (SELECT feeder " +
//    "FROM follow " +
//    "WHERE follower = ?)" +
//    "                           ) b " +
//    "ORDER BY b.actdate) b " +
//    "GROUP BY b.num) b LEFT OUTER JOIN board_good g " +
//    "ON b.num = g.grp " +
//    "GROUP BY b.num) b LEFT OUTER JOIN board_good g " +
//    "ON b.num = g.grp and g.email = ? " +
//    "GROUP BY b.num) b LEFT OUTER JOIN board_comment g " +
//    "ON b.num = g.grp " +
//    "GROUP BY b.num) feed JOIN board b ON feed.num = b.num " +
//    "UNION ALL " +
//    "SELECT 0 AS isBoard, feed.cate, feed.num, feed.actor, c.email AS writer, c.title, c.one_line AS content, c.thumbnail, 0 AS good, 0 AS cmt,0 AS isGood, c.regdate, feed.actdate, DATE_ADD(c.regdate,INTERVAL 24 HOUR) AS acc_date " +
//    "FROM (SELECT b.cate, b.num, b.actor, b.actdate " +
//    "FROM (SELECT cate, num, actor, regdate AS actdate " +
//    "FROM course_log " +
//    "WHERE actor IN (SELECT friend2 AS feeder FROM friend_list " +
//    "WHERE friend1 = ? " +
//    "UNION ALL " +
//    "SELECT feeder FROM follow " +
//    "WHERE follower = ?) " +
//    "ORDER BY regdate desc) b " +
//    "GROUP BY b.num) feed JOIN course c ON feed.num = c.num " +
//    ") feed JOIN user_info u1  ON feed.actor = u1.email " +
//    "JOIN user_info u2 ON feed.writer = u2.email " +
//    "ORDER BY acc_date " +
//    "LIMIT ?, 10;"


//사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,페이지
exports.getFeed = "SELECT feed.isBoard, feed.cate, feed.num,feed.thumbnail, feed.actor,u1.isTutor AS isTutor, u1.name AS actor_name, u1.thumbnail AS actor_thumbnail, feed.writer ,u2.isTutor AS iswriterTutor, u2.name AS writer_name, u2.thumbnail AS writer_thumbnail, feed.title, feed.content, feed.good, feed.cmt, feed.isGood, DATE_FORMAT(feed.regdate,'%Y-%m-%d %H:%i:%s') as regdate, feed.actdate, feed.acc_date " +
    "FROM( " +
    "SELECT 1 AS isBoard,b.cate,b.num,b.actor,g.email as writer, g.title,g.content,g.thumbnail, g.cmt, g.good,b.isgood,g.regdate ,b.actdate " +
//    ", if(g.cmt+g.good <> 0,DATE_ADD(g.regdate,INTERVAL 12*LOG(10,(g.cmt*2)+(g.good)) HOUR),g.regdate) AS acc_date " +
    ", if(g.cmt+g.good <> 0,DATE_ADD(g.regdate,INTERVAL 720*LOG(10,(g.cmt*2)+(g.good)) MINUTE),g.regdate) AS acc_date " +
    "FROM( " +
    "SELECT b.cate,b.num,b.actor,count(g.email) as isGood,b.actdate " +
    "from( " +
    "SELECT b.cate,b.num,b.actor,b.actdate " +
    "FROM( SELECT cate,num,actor,actdate " +
    "FROM " +
    "(SELECT cate, num, actor,regdate AS actdate " +
    "FROM board_log " +
    "WHERE actor IN   (SELECT friend2 " +
    "FROM friend_list " +
    "WHERE friend1 = ?) " +
    "UNION ALL " +
    "SELECT 3 AS cate, num, email AS actor, regdate AS actdate " +
    "FROM board " +
    "WHERE email IN   (SELECT feeder " +
    "FROM follow " +
    "WHERE follower = ?) " +
    ") b " +
    "ORDER BY b.actdate desc) b " +
    "GROUP BY b.num " +
    ") b left outer join board_good g " +
    "ON b.num = g.grp and g.email = ? " +
    "GROUP BY b.num " +
    ") b JOIN board_cmt_good g " +
    "ON b.num = g.num " +
    "UNION ALL " +
    "SELECT 0 AS isBoard, feed.cate, feed.num, feed.actor " +
    ", c.email AS writer " +
    ", c.title, c.one_line AS content, c.thumbnail, 0 AS good, 0 AS cmt,0 AS isGood, c.regdate, feed.actdate " +
    ", DATE_ADD(c.regdate,INTERVAL 24 HOUR) AS acc_date " +
    "FROM (SELECT b.cate, b.num, b.actor, b.actdate " +
    "FROM (SELECT cate, num, actor, regdate AS actdate " +
    "FROM course_log " +
    "WHERE actor IN   (SELECT friend2 AS feeder FROM friend_list " +
    "WHERE friend1 = ? " +
    "UNION ALL " +
    "SELECT feeder FROM follow " +
    "WHERE follower = ?) " +
    "ORDER BY regdate desc) b " +
    "GROUP BY b.num) feed JOIN course c ON feed.num = c.num WHERE c.del_yn = 'n' " +
    ") feed JOIN user_info u1  ON feed.actor = u1.email " +
    "JOIN user_info u2 ON feed.writer = u2.email " +
    "ORDER BY acc_date desc " +
    "LIMIT ?, 10;";




//사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,사용자 이메일,페이지
exports.getFeed2 = "SELECT feed.isBoard, feed.cate, feed.num,feed.thumbnail, feed.actor,u1.isTutor AS isTutor, u1.name AS actor_name, u1.thumbnail AS actor_thumbnail, feed.writer ,u2.isTutor AS iswriterTutor, u2.name AS writer_name, u2.thumbnail AS writer_thumbnail, feed.title, feed.content, feed.good, feed.cmt, feed.isGood, DATE_FORMAT(feed.regdate,'%Y-%m-%d %H:%i:%s') as regdate, feed.actdate, feed.acc_date " +
    "FROM( " +
    "SELECT 1 AS isBoard,b.cate,b.num,b.actor,g.email as writer, g.title,g.content,g.thumbnail, g.cmt, g.good,b.isgood,g.regdate ,b.actdate " +
    ", if(g.cmt+g.good <> 0,DATE_ADD(g.regdate,INTERVAL 12*LOG(10,(g.cmt*2)+(g.good)) HOUR),g.regdate) AS acc_date " +
    "FROM( " +
    "SELECT b.cate,b.num,b.actor,count(g.email) as isGood,b.actdate " +
    "from( " +
    "SELECT b.cate,b.num,b.actor,b.actdate " +
    "FROM( SELECT cate,num,actor,actdate " +
    "FROM " +
    "(SELECT cate, num, actor,regdate AS actdate " +
    "FROM board_log " +
    "WHERE actor IN   (SELECT friend2 " +
    "FROM friend_list " +
    "WHERE friend1 = ?) " +
    "UNION ALL " +
    "SELECT 3 AS cate, num, email AS actor, regdate AS actdate " +
    "FROM board " +
    "WHERE email IN   (SELECT feeder " +
    "FROM follow " +
    "WHERE follower = ?) " +
    ") b " +
    "ORDER BY b.actdate desc) b " +
    "GROUP BY b.num " +
    ") b left outer join board_good g " +
    "ON b.num = g.grp and g.email = ? " +
    "GROUP BY b.num " +
    ") b JOIN board_cmt_good g " +
    "ON b.num = g.num " +
    "UNION ALL " +
    "SELECT 0 AS isBoard, feed.cate, feed.num, feed.actor " +
    ", c.email AS writer " +
    ", c.title, c.one_line AS content, c.thumbnail, 0 AS good, 0 AS cmt,0 AS isGood, c.regdate, feed.actdate " +
    ", DATE_ADD(c.regdate,INTERVAL 24 HOUR) AS acc_date " +
    "FROM (SELECT b.cate, b.num, b.actor, b.actdate " +
    "FROM (SELECT cate, num, actor, regdate AS actdate " +
    "FROM course_log " +
    "WHERE actor IN   (SELECT friend2 AS feeder FROM friend_list " +
    "WHERE friend1 = ? " +
    "UNION ALL " +
    "SELECT feeder FROM follow " +
    "WHERE follower = ?) " +
    "ORDER BY regdate desc) b " +
    "GROUP BY b.num) feed JOIN course c ON feed.num = c.num WHERE c.del_yn = 'n' " +
    ") feed JOIN user_info u1  ON feed.actor = u1.email " +
    "JOIN user_info u2 ON feed.writer = u2.email " +
    "ORDER BY regdate desc " +
    "LIMIT ?, 10;";

//유저 이메일, 타겟이메일, 페이지
exports.board_list = "select b.num, b.email as writer, info.isTutor, info.name, info.thumbnail as writer_thumbnail, b.title, b.content, b.thumbnail, b.regdate, b.cmt, b.good, b.isGood, b.regdate " +
    "from (select b.num, b.email, b.title, b.content, b.thumbnail, DATE_FORMAT(b.regdate,'%Y-%m-%d %H:%i:%s') as regdate, b.cmt, b.good, count(good.email) as isGood " +
    "from board_cmt_good b left outer join board_good good " +
    "on b.num = good.grp " +
    "and good.email = ? " +
    "where b.email = ? " +
    "group by b.num) b, user_info info " +
    "where b.email = info.email " +
    "ORDER BY b.regdate DESC " +
    "limit ?, ?;";

//유저 이메일,글 번호
exports.read_article = "select b.num, b.email as writer,b.thumbnail as writer_thumbnail, info.isTutor, info.name, info.thumbnail, b.title, b.content, b.url1,b.url2, b.thumbnail, DATE_FORMAT(b.regdate,'%Y-%m-%d %H:%i:%s') as regdate, b.cmt, b.good, b.isGood " +
    "from (select b.num, b.email, b.title, b.content, b.url1,b.url2,b.thumbnail, b.regdate, b.cmt, b.good, count(good.email) as isGood " +
    "from board_cmt_good b left outer join board_good good " +
    "on b.num = good.grp " +
    "and good.email = ? " +
    "where b.num = ? " +
    "group by b.num) b, user_info info " +
    "where b.email = info.email;";

//글 번호
exports.read_photo = "SELECT photo FROM board_photo " +
    "where grp = ? " +
    "order by grp_num asc";


// 글번호
exports.read_comments = "SELECT b.grp,b.grp_num,b.email as actor, thumbnail as actor_thumbnail , info.isTutor, info.name, b.content, DATE_FORMAT(b.regdate,'%Y-%m-%d %H:%i:%s') as regdate  " +
    "from board_comment b join user_info info " +
    "on b.email = info.email " +
    "where b.grp = ? " +
    "and b.del_yn = 'n' " +
    "ORDER BY b.grp_num desc";

//exports.insert_board = "INSERT INTO board(email, title, content, url1, url2) values(?,?,?,?,?)";

exports.write_board = "INSERT INTO board SET ?";

exports.write_board_thumbnail = "UPDATE board SET thumbnail = ? WHERE num = ? and email = ? ";

exports.board_photo_insert = "INSERT INTO board_photo(grp,grp_num,photo,photo_org_name) VALUES(?,(select a.grp_num from (select count(*)+1 as grp_num from board_photo where grp = ?) a),?,?)";
//iniput.num = values.num;
//inputs.email = values.logined;
//inputs.title = values.title;
//inputs.content = values.content;
//inputs.url1 = values.url1;
//inputs.url2 = values.url2;

exports.modify_board = "UPDATE board SET title = ?, content= ?, url1 = ?, url2 =?,thumbnail = ? WHERE num =? and email = ?";

exports.del_photo = "DELETE from board_photo WHERE grp = ?";

//exports.modify_board = "UPDATE board SET title = ?, content= ?, url1 = ?, url2 =?,thumbnail = ? WHERE num =? and email = ?";

exports.delete_board = "UPDATE board SET del_yn = 'y' WHERE num =? and email = ?";

exports.insert_comment = "insert into board_comment(grp,grp_num,email,content) " +
    "values(?,(select grp_num from (select count(*)+1 as grp_num from board_comment where grp = ?) b), ?,?)";

exports.modify_comment = "UPDATE board_comment SET content = ? WHERE grp = ? and grp_num = ? and email = ?;";

exports.delete_comment = "UPDATE board_comment SET del_yn = 'y' WHERE grp = ? and grp_num = ? and email = ?";

exports.board_good_req = "INSERT INTO board_good SET ?";

exports.board_good_del = "DELETE FROM board_good WHERE grp = ? and email = ?";


//---------------------------------------------------------------------------------------------------------------member--------------------------------------------------------------

exports.join_common = "INSERT INTO users SET ?";

exports.join_user = "INSERT INTO user VALUES(?,?,?)";

exports.join_tutor = "INSERT INTO tutor VALUES(?,?,?)";

exports.insert_subject = "INSERT INTO tutor_subject VALUES(?,?)";

exports.login = "SELECT pw,salt,isTutor FROM users WHERE email = ?";

exports.getUserInfo = "SELECT email,isTutor,name,thumbnail,address_si,address_gu,school_name,grade FROM stu_info WHERE email = ? ";

exports.getTutorInfo = "SELECT email,isTutor,name,thumbnail,address_si,address_gu FROM tutor_info WHERE email = ? ";
//exports.getSchoolInfo = "SELECT school_name, grade FROM stu_info WHERE email = ? ";






//---------------------------------------------------------------------------------------------------------------search---------------------------------------------------------------------------

//사용자, 사용자, 사용자, 사용자, keyword
//exports.search_people = "select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, u.school_name, u.grade, log(10,lvl.score)+lvl.together as score, lvl.together " +
//    "from stu_info u left outer join (select u2.email, 1 as score, 0 as together " +
//    "from user_info u1, user_info u2 " +
//    "where u1.email = ? and u1.address = u2.address and u2.email <> ? " +
//    "union all select " +
//    "friend2, sum(score * 1) as score, count(friend2) as together " +
//    "from " +
//    "friend_list " +
//    "where " +
//    "friend1 in (select friend2 " +
//    "from friend_list " +
//    "where friend1 = ?) " +
//    "and friend2 <> ?) lvl " +
//    "on u.email = lvl.email " +
//    "where name like ? " +
//    "order by score;";

exports.search_people="select u.email, u.name, u.thumbnail, u.address_si, u.address_gu,u.school_name,u.grade, " +
    "ifnull(r.score,0)+if(u2.address_gu = u.address_gu,1,0)+if(u2.age = u.age,0.5,0) as score,r.together " +
    "from " +
    "(select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, u.age,u.school_name,u.grade " +
    "from stu_info u " +
    "where u.name like ? ) u left outer join recommend_duple r " +
    "on u.email = r.friend2 and r.friend1 = ? " +
    "left outer join user_info u2 on r.friend1 = u2.email " +
    "group by u.email " +
    "order by score desc, together desc " +
    "limit ?, ?;";

//키워드.키워드. 유저, 유저, 유저, 유저
//exports.search_totur = "select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, lvl.score+lvl.together as score, sum(lvl.together) as together " +
//    "from " +
//    "(select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, 0 as score, 0 as together " +
//    "from tutor_info u left outer join tutor_subject s " +
//    "on u.email = s.email " +
//    "where u.name like ? " +
//    "or s.subjects like ?) u left outer join (select u2.email, 10 as score, 0 as together " +
//    "from user_info u1, user_info u2 " +
//    "where u1.email = ? and u1.address = u2.address and u2.email <> ? " +
//    "union all select " +
//    "friend2, sum(score * 1) as score, count(friend2) as together " +
//    "from " +
//    "friend_list " +
//    "where " +
//    "friend1 in (select friend2 " +
//    "from friend_list " +
//    "where friend1 = ?) " +
//    "and friend2 <> ?) lvl " +
//    "on u.email = lvl.email " +
//    "group by u.email " +
//    "order by score desc;";
exports.search_totur = "select u.email, u.name, u.thumbnail, u.address_si, u.address_gu,ifnull(r.score,0)+if(u2.address_gu = u.address_gu,1,0) as score,r.together " +
    "from " +
    "(select u.email, u.name, u.thumbnail, u.address_si, u.address_gu " +
    "from tutor_info u left outer join tutor_subject s " +
    "on u.email = s.email " +
    "where u.name like ? " +
    "or s.subjects like ?) u left outer join recommend_duple r " +
    "on u.email = r.friend2 and r.friend1 = ? " +
    "left outer join user_info u2 on r.friend1 = u2.email " +
    "group by u.email " +
    "order by score desc, together desc " +
    "limit ?, ?;"

//사용자, 키워드, 키워드
exports.search_course = "select c.num, c.email, u1.thumbnail as user_thumbnail, u1.name, c.thumbnail, c.title, c.one_line,c.content," +
    "DATE_FORMAT(c.regdate,'%Y-%m-%d %H:%i:%s') as regdate,c.avg,c.address ,count(u1.email)+avg as score " +
    "from course_with_address c left outer join user_info u1 " +
    "on c.address = u1.address " +
    "and u1.email = ? " +
    "where c.num in(select num from course_subject " +
    "where subjects like ?) " +
    "or one_line like ? " +
    "group by c.num " +
    "order by score desc;";



exports.follow_add = "INSERT INTO follow(feeder,follower) values(?,?)";

exports.follow_break = "delete from follow where feeder = ? and follower = ? ";

exports.friend_check = "select agree from friend_check where friend1 = ? and friend2 = ?";

exports.friend_req = "INSERT INTO friend SET ? ";

exports.friend_agree = "UPDATE friend SET agree = 'y' where friend1 = ? and friend2 = ? and agree = 'n' ";

exports.friend_break = "DELETE from friend where (friend1,friend2) in ((?,?),(?,?));";


//-------------------------------------------------------------------------------------message-------------------------------------------------------------------------------------------------
exports.message_send = "INSERT INTO message SET ?";

exports.message_list = "select m.num, m.from, u.name as from_name, u.thumbnail, m.content,u.isTutor, DATE_FORMAT(m.senddate,'%Y-%m-%d %H:%i:%s') as senddate " +
    "from message m, user_info u " +
    "where m.from = u.email " +
    "and m.read_yn = 'n' " +
    "and m.to = ? " +
    "limit ? , ?;";

exports.message_read = "UPDATE message m SET read_yn = 'y' WHERE m.num = ? and m.to = ? ";

exports.message_delete = "UPDATE message m SET read_yn = 'y' WHERE m.num = ? and m.to = ? ";

//exports.message_delete = "DELETE from message WHERE message.num = ? and message.to = ? ";

exports.notice = "SELECT title,content,DATE_FORMAT(regdate,'%Y-%m-%d %H:%i:%s') as regdate FROM notice ORDER BY regdate DESC LIMIT 0,10 ;";

//------------------------------------------------------------------------------------course---------------------------------------------------------------------------------------------------------------

exports.course_write = "INSERT INTO course SET ? ";

exports.course_subject = "INSERT INTO course_subject values(?,?)";

exports.course_getPhotos = "SELECT thumbnail, photo, photo_org_name FROM course WHERE num = ? and email = ?";
exports.course_modify = "UPDATE course SET title = ?, content = ?, one_line = ?, photo = ?, thumbnail = ?, photo_org_name = ? WHERE email = ? and num = ? ";
//exports.course_modify =""

exports.course_subject_del = "DELETE from course_subject WHERE num = ? ";

exports.course_del = "UPDATE course SET del_yn = 'y' WHERE email = ? and num = ?";

exports.review_write = "insert into review(grp,grp_num,email,title,content) " +
    "values(?,(select grp_num from (select count(*)+1 as grp_num from review where grp = ?) b), ?,?,?)";

exports.review_modify = "UPDATE review SET title = ?, content = ? WHERE email = ? and  num = ? ";

exports.review_delete = "UPDATE review SET del_yn = 'y' WHERE email = ? and  num = ? ";

exports.review_good = "INSERT INTO review_good(grp,email) VALUES(?,?)";

exports.review_good_del = "DELETE from review_good WHERE grp = ? and email = ?";


exports.review_info = "select c.num, c.email, u.isTutor, u.name, u.thumbnail,c.title,c.content,c.one_line,c.regdate from course c, user_info u " +
    "where c.email = u.email " +
    "and c.num = ?;";

//친구 a,b,a,b,a,b
exports.insert_relation = "INSERT INTO alram_relation(receiver,alram_relation.from,alram_relation.to) (select * from " +
    "( " +
    "select friend2, ?,? from friend_list where friend1 = ? " +
    "union all " +
    "select friend2, ?,? from friend_list where friend1 = ?) a " +
    "group by friend2);";



exports.insert_relation1 = "INSERT INTO alram_relation(reciver,alram_relation.from,alram_relation.to) values(" +
    "select friend2, ?,? from friend_list where friend1 = ? )";
//모든 배열 객체내에 있는 target_name이 키값인 모든 값들(길이 상관x)을 배열로하여 {target_name:배열} 로 반환합니다.
//var src = [{"subjects":"수학"},{"subjects":"과학"},{"subjects":"영어"},{"subjects":"국어"}]
//var result = to_array(src,"subjects");
//result = {"subjects":["수학","과학","영어","국어"]}
//to_array = function(obj,target_name){
//    var tmp = {};
//    tmp[target_name] = [];
//    for(var i = 0;i<(obj.length);i++){
//        console.log(i);
//        // console.log(sub_obj[i].subjects);
//        tmp[target_name].push(obj[i][target_name]);
//    }
//    return tmp;
//};

//var arr = [];
//var curr = '';
//var prev = '';
//var len = rows.length;
//var words = [];
//for(i=0,j=0,row=rows[i],i<len;i++){
//    curr =row.note;
//    console.log("curr",curr);
//    if(curr!= prev){
//        prev=curr;
//        words =[];
//        arr[j]={'note':curr,'words':words};
//        j++;
//    }
//    words.push(row.word);
//}




//선생님 이메일
exports.tutor_simple_info = 'SELECT email, name, address_si, address_gu,thumbnail,photo,academic,etc ' +
    'FROM tutor_info ' +
    'WHERE email = ?';

//선생님 이메일
exports.getSubject = "select subjects from tutor_subject " +
    "where email = ?";

// 'b@b.com' = req.session.email
exports.relation_me_friend = "select count(*) as isFriend from friend_list where friend1 = ? and friend2 = ?";

exports.relation_me_friend2 = "select agree from friend_list2 where friend1 = ? and friend2 = ?";

// 'b@b.com' = req.session.email
exports.relation_me_follow = "select count(*) as isFollow from follow WHERE feeder = ? and follower = ?";

//exports.follow_list = "select u.thumbnail from (select same_address.email from (select f.follower as email from follow f left outer join (select u2.email from users u1, users u2 where u1.email = ? and u1.address_si = u2.address_si and u1.address_gu = u2.address_gu and u2.email <> ? ) as u on u.email = f.follower where f.feeder = ? union select f.feeder as email from follow f left outer join (select u2.email from users u1, users u2 where u1.email = ? and u1.address_si = u2.address_si and u1.address_gu = u2.address_gu and u2.email <> ? ) as u on u.email = f.feeder where f.follower = ?) as same_address left outer join ( select f.follower as email from follow f where f.feeder = ? union select f.feeder as email from follow f where f.follower = ?) as my_follow on my_follow.email = same_address.email) as recommend left outer join users u on u.email = recommend.email limit 0,3";

//해당 유저의 친구의 친구와 팔로우 리스트를 비교, 연관성이 높으면 상위로, 지역이 같다면 가중치는 1.1배
exports.follow_list = "select follower, u1.thumbnail, rd.score*if(u1.address=u2.address,1.1,1) as score " +
    "from follow f left outer join recommend_duple rd " +
    "on f.feeder = rd.friend1 and f.follower = rd.friend2 " +
    "join user_info u1 on f.follower = u1.email " +
    "join user_info u2 on f.feeder = u2.email " +
    "where f.feeder = ? " +
    "order by rd.score desc " +
    "limit ?,?;";


exports.follow_list2 = "select feeder,follower, u.name,u.address,u.isTutor,u.thumbnail, together " +
    "from follow f left outer join recommend_duple r " +
    "on f.feeder = r.friend1 " +
    "and f.follower = r.friend2 " +
    "join user_info u " +
    "on f.follower = u.email " +
    "WHERE feeder = ? " +
    "order by together desc, r.score desc;";

exports.alarm_relation_del = "UPDATE alram_relation SET receive_yn = 'y' " +
    "WHERE alram_relation.from = ? and alram_relation.to = ? and receiver = ?";

//선생님 이메일
//exports.friend_list = "select info.thumbnail from(select fl.friend2, 1 as score from friend_list fl, users u1, users u2 where fl.friend1 = ? and fl.friend1 = u1.email and u2.email = ? and u1.address_si = u2.address_si and u1.address_gu = u2.address_gu union all select fl.friend2, score from friend_list fl left outer join (select fl.friend2 as email from friend_list fl where fl.friend1 = ?) as my_friend on my_friend.email = fl.friend2 where fl.friend1 = ?) as relation_friend join users info on relation_friend.friend2 = info.email group by friend2 ssorder by score desc limit 0, 3";

//친구간의 스코어, 지역이 같다면 가중치는 1.1배
exports.friend_list = /*"select thumbnail from  " +   */"select email, thumbnail from  " +
    "(select f.friend1,f.friend2,if(u1.address=u2.address,1.1,1)*f.score as score " +
    "from  friend_list f join user_info u1 join user_info u2 " +
    "where f.friend1 = u1.email " +
    "and f.friend2 = u2.email " +
    "and f.friend1 = ? " +
    "order by score desc) f, user_info u " +
    "where f.friend2 = u.email " +
    "limit ?, ?;";

exports.friend_list2 = /*"select thumbnail from  " +   */"select email, name, thumbnail, isTutor, address from  " +
    "(select f.friend1,f.friend2,if(u1.address=u2.address,1.1,1)*f.score as score " +
    "from  friend_list f join user_info u1 join user_info u2 " +
    "where f.friend1 = u1.email " +
    "and f.friend2 = u2.email " +
    "and f.friend1 = ? " +
    "order by score desc) f, user_info u " +
    "where f.friend2 = u.email ";

//내가 좋아요를 눌렀는지 안눌렀는지에 대한 정보 포함
//exports.board_list = "select 1 as isBoard,b.num,b.email as writer,info.name as writer_name,info.thumbnail,b.title,b.content,b.thumbnail,b.cmt,b.good,b.regdate,b.isGood " +
//    "from(select b.num, b.email, b.title, b.content, b.thumbnail, b.regdate, b.cmt, b.good, count(good.email) as isGood " +
//    "from board_cmt_good b left outer join board_good good ON b.num = good.grp and good.email = ? " +
//    "group by b.num) b, user_info info " +
//    "where b.email = info.email and b.email = ? order by b.regdate desc limit ?,10;";

//강의마다 리뷰 갯수가 몇개인지 포함되어 있다.
exports.course_list = "select c.num, c.email as writer, u.name as writer_name, u.thumbnail as writer_thumbnail, c.title,c.one_line, c.thumbnail, c.review_count, c.regdate " +
    "from course_review c, tutor_info u " +
    "where c.email = u.email and c.email = ?;";

exports.tutor_detail = "select email, name, thumbnail, photo, address_si, address_gu, about_me, academic, etc from tutor_info where email = ?";

exports.tutor_subject = "select ts.subjects from tutor_subject ts, tutor t where t.email = ? and t.email = ts.email";

exports.tutor_career = "select num,title, DATE_FORMAT(fromdate,'%Y-%m-%d') as fromdate, DATE_FORMAT(todate,'%Y-%m-%d') as todate, content from tutor_career where email = ?";

exports.tutor_url = "SELECT num, title, url FROM tutor_url WHERE email = ? ";

exports.write_career = "insert into tutor_career SET ?";

exports.modify_career = "update tutor_career set fromdate = ?, todate = ?, title = ?, content = ? WHERE num = ? and email = ?";

exports.del_career = "delete from tutor_career WHERE num = ? and email = ?";

exports.write_url = "INSERT INTO tutor_url SET ?";

exports.modify_url ="UPDATE tutor_url SET title = ?, url = ? WHERE num = ? and email = ? ";

exports.del_url = "DELETE FROM tutor_url WHERE num = ? and email = ? ";

exports.modify_member = "UPDATE users SET address_si = ?, address_gu = ?, thumbnail = ?, photo = ?, photo_org_name = ? WHERE email = ?";

exports.modify_tutor = "UPDATE tutor SET academic = ?, etc = ?  WHERE email = ?";

exports.modify_stu = "UPDATE user SET school_name = ?, grade = ? WHERE email = ?";





exports.modify_tutor = "UPDATE users SET last_name = ?, first_name = ?, photo= ?, address_si = ?, address_gu = ? WHERE email = ?";

exports.modify_tutor_info = "UPDATE tutor SET academic = ?, etc = ?  WHERE email = ?";

exports.modify_tutor_url = "UPDATE tutor_url SET url = ?, title = ? WHERE email = ? and num = ?";

exports.delete_subject = "delete from tutor_subject where email = ?";

exports.insert_subject = "insert into tutor_subject(email, subjects) values ((select t.email from tutor t where t.email = ?), ?)";

//exports.user_info = "select u.email as email, concat(us.last_name, us.first_name) as name, us.photo, us.thumbnail, us.address_si, us.address_gu, us.about_me, u.school_name, u.grade from users us, user u where us.email = u.email and u.email = ?";

exports.user_info = "SELECT email,name,address_si,address_gu,thumbnail,photo,school_name,grade,about_me FROM stu_info WHERE email = ? ";

exports.friend_list_user = "select info.thumbnail from(select fl.friend2, 1 as score from friend_list fl, users u1, users u2 where fl.friend1 = ? and fl.friend1 = u1.email and u2.email = ? and u1.address_si = u2.address_si and u1.address_gu = u2.address_gu union all select fl.friend2, score from friend_list fl left outer join (select fl.friend2 as email from friend_list fl where fl.friend1 = ?) as my_friend on my_friend.email = fl.friend2 where fl.friend1 = ?) as relation_friend join users info on relation_friend.friend2 = info.email group by friend2 order by score desc limit 0, 6";

exports.modify_user_info = "update users set photo = ?, address_si = ?, address_gu = ?, about_me = ? where email = ?";
exports.modify_user_school = "update user set school_name = ?, grade = ? where email = ?";
///////////////////////////////////////////users.js

exports.course_info = "select c.num, c.email,  u.name, c.title, c.content, c.one_line, c.photo, DATE_FORMAT(regdate,'%Y-%m-%d %H:%i:%s') as regdate " +
    "from course c join user_info u on c.email = u.email where c.num = ?";


exports.course_subjects = "select cs.subjects from course_subject cs, course_all ca where ca.num = cs.num and ca.num = ?";


//준호꺼 이거 망함
//exports.review_list = "select rcg.grp, rcg.num as grp_num, rcg.email as actor, concat(u.last_name, u.first_name), rcg.title, rcg.content, rcg.regdate as actdate, rcg.totalGood as good from review_count_good rcg, users u where grp = ? and rcg.email = u.email";
//
//exports.review_isGood = "select rg.email as email from review r, review_good rg, users u where u.email = ? and  rg.email = u.email and rg.grp = ? and r.grp_num = rg.grp";

exports.review_list = "select num,r.grp,grp_num,r.email,name,thumbnail,title,content,DATE_FORMAT(r.regdate,'%Y-%m-%d %H:%i:%s') as regdate ,good,count(g.email) as isGood " +
    "from " +
    "(select " +
    "rcg.num, rcg.grp, rcg.grp_num, rcg.email, u.name, u.thumbnail, rcg.title, rcg.content, rcg.regdate, rcg.totalGood as good " +
    "from " +
    "review_count_good rcg join user_info u  " +
    "on rcg.email = u.email " +
    "where grp = ? ) r left outer join review_good g " +
    "on r.num = g.grp and g.email = ? " +
    "group by num;";


exports.member_pw_change = "update users set pw = ?, salt = ? where email = ?";

exports.reset_pw = "insert into reset_pw(email,once_key) values(?,?)";

exports.reset_pw_form = "update reset_pw SET pass_yn = 1 WHERE email = ? and once_key = ? and pass_yn = 0";

exports.reset_pw_1 = "update reset_pw SET pass_yn = 1 WHERE email = ?";

exports.reset_pw_proc = "update reset_pw SET pass_yn = 2 WHERE email = ? and pass_yn = 1";

exports.reset_pw_2 = "update reset_pw SET pass_yn = 2 WHERE email = ?";



//-----------------------------------------------------------------알람----------------------------------------------
//댓글을 달았구나
exports.board_cmt_alaram_req = "INSERT INTO alarm_log(receiver,actor,cate,target_num) values((select email from board where num = ?),?,1,?);";
//메세지를 보냈구나
exports.meesage_alarm_send ="INSERT INTO alarm_log(receiver,actor,cate,target_num) values(?,?,2,?)";
//리뷰를 썼구나
exports.review_alarm ="INSERT INTO alarm_log(receiver,actor,cate,target_num) values((select email from course where num = ?),?,3,?)";
//친구요청을 보냈구나
exports.friend_alarm_req = "INSERT INTO alarm_log(receiver,actor,cate) values(?,?,4)";
//친구수락을 했구나
exports.friend_alarm_agree = "INSERT INTO alarm_log(receiver,actor,cate) values(?,?,5)";
//친구요청을 거부했구나
exports.friend_alarm_reject = "INSERT INTO alarm_log(receiver,actor,cate) values(?,?,6)";
//actor 팔로워, receiver 피더
exports.follow_alarm_req = "INSERT INTO alarm_log(receiver,actor,cate) values(?,?,7)";


exports.school_search = "SELECT school_name FROM school WHERE school_name LIKE ?";

exports.check_email = "SELECT COUNT(*) as isExist FROM users WHERE email = ?";

exports.getAlarm = "select a.num,a.target_num,a.receiver,a.actor,u.name,u.thumbnail,u.isTutor, a.target_num, DATE_FORMAT(a.regdate,'%Y-%m-%d %H:%i:%s') as regdate, a.cate, " +
    "m.content,b.title as board_title, c.title as course_title " +
    "from alarm_log a " +
    "left outer join message m " +
    "on a.target_num = m.num and a.cate = 2 " +
    "left outer join board b " +
    "on a.target_num = b.num and a.cate = 1 " +
    "left outer join course c " +
    "on a.target_num = c.num and a.cate = 3 " +
    "join user_info u on a.actor = u.email " +
    "where (m.read_yn ='n' or m.read_yn is null) " +
    "and a.del_yn = 0 " +
    "and a.receiver = ?;"

exports.del_alarm = "UPDATE alarm_log SET del_yn = 1 WHERE num = ? and receiver = ?";