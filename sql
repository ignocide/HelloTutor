select b.cate, b.num, b.actor, b.writer, b.title, b.content, b.good, count(*) cmt, b.writedate, b.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
		FROM
			(select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, count(*) as good, b.regdate as writedate, l.regdate, l.acc_date
				from board_log l, board_test b, board_good_test g
				where l.num = b.num and l.num = g.grp
				group by regdate,num) b, board_comment_test cmt
		where b.num = cmt.grp
		group by regdate,num;


select cate,
    num,
    actor,
    regdate
from board_log
where actor = 'tutee2@tutee.com'
group by num;


select cate,num,actor,writer,title,content,0 as good,0 as cmt,regdate,DATE_ADD(accdate,INTERVAL -24 HOUR) as accdate from course_log;



#log+친구 임시
select cate,
    num,
    actor,
    regdate
from board_log
where actor = 'tutee2@tutee.com'
group by num;

#(select friend2 from friend
#					where friend1 = 'tutor@tutor.com'
#				union all
#				select friend1 from friend
#					where friend2 = 'tutor@tutor.com'
#				);


#log+친구 + 글 + 좋아요 임시
select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, count(*) as good, b.regdate as writedate, l.regdate
                from (select cate, num, actor,regdate 
                        from (select cate, num, actor, regdate
                        from board_log
                        where actor = 'tutee2@tutee.com'
                        order by regdate desc)
                    group by num) l, board_test b, board_good_test g
                where l.num = b.num and l.num = g.grp
                group by num


#log+친구 + 글 + 좋아요수 + 댓글수 + 알고리즘 적용 임시
select b.cate, b.num, b.actor, b.writer, b.title, b.content, b.good, count(*) cmt, b.writedate, b.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
        from
            (select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, count(*) as good, b.regdate as writedate, l.regdate
                from (select cate, num, actor,regdate 
                        from (select cate, num, actor, regdate
                           from board_log
                           where actor = 'tutee2@tutee.com'
                           order by regdate desc)
                      group by num) l, board_test b, board_good_test g
            where l.num = b.num and l.num = g.grp
            group by num) b, board_comment_test cmt
        where b.num = cmt.grp
        group by num;


#log+친구 + 글 + 좋아요수 + 댓글수 + 알고리즘 적용
select b.cate, b.num, b.actor, b.writer, b.title, b.content, b.good, count(*) cmt, b.writedate, b.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
        from
            (select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, count(*) as good, b.regdate as writedate, l.regdate
                from (select cate, num, actor,regdate 
                        from (select cate, num, actor, regdate
                                from board_log
                                where actor =   (select friend2 from friend
                                                    where friend1 = 'tutor@tutor.com'
                                                    union all
                                                select friend1 from friend
                                                    where friend2 = 'tutor@tutor.com')
                            order by regdate desc)
                        group by num) l, board_test b, board_good_test g
            where l.num = b.num and l.num = g.grp
            group by num) b, board_comment_test cmt
        where b.num = cmt.grp
        group by num;


#board+팔로워 + 글 + 좋아요수 + 댓글수 + 알고리즘 적용
select b.cate, b.num, b.actor, b.writer, b.title, b.content, b.good, count(*) cmt, b.writedate, b.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
    from
        (select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, b.thumbnail, count(*) as good, b.regdate as writedate, l.regdate
            from (select cate, num, actor,regdate 
                    from (select cate, num, actor, regdate
                            from board_log
                            where actor =   (select friend2 from friend
                                                where friend1 = 'tutor@tutor.com'
                                                union all
                                            select friend1 from friend
                                                where friend2 = 'tutor@tutor.com')
                        order by regdate desc
                        union all
                        select 3 as cate, num, email as actor, regdate,
                            from board_test
                            where actor =   (select feeder from follow
                                                where follower = 'tutor@tutor.com')
                        order by regdate desc
                        union all
                        )
                    group by num) l, board_test b, board_good_test g
        where l.num = b.num and l.num = g.grp
        group by num) b, board_comment_test cmt
    where b.num = cmt.grp
    group by num;

#course+팔로워 + 글 + 좋아요수 + 댓글수 + 알고리즘 적용
select l.cate, l.num, l.actor, c.email as writer, c.title, c.content,c.thumbnail, 0 as good, 0 as cmt,c.regdate as writedate, l.regdate, DATE_ADD(b.acc_date,INTERVAL -24 HOUR) as acc_date
            from (select cate, num, actor,regdate 
                    from (select cate, num, actor, regdate
                            from course_log
                            where actor =   (select friend2 from friend
                                                where friend1 = 'tutor@tutor.com'
                                                union all
                                            select friend1 from friend
                                                where friend2 = 'tutor@tutor.com')
                        order by regdate desc
                        )
                    group by num) l, course_test c
        where l.num = c.num
        group by num;


##########################################################메인 피드#########################################################################
select feed.isBoard, feed.cate, feed.num, feed.actor,u1.isTutor as isTutor, u1.name as actor_name, u1.thumbnail as actor_thumbnail, feed.writer,u1.isTutor as iswriterTutor, u2.name as actor_name, u2.thumbnail as actor_thumbnail, feed.title, feed.content, feed.good, feed.cmt, feed.writedate, feed.regdate 
from
     (select 1 as isboard,l.cate, l.num, l.actor, b.email as writer, b.title, b.content, b.good,count(*) as cmt, b.thumbnail, b.regdate as writedate, l.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
        from (select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, count(*) as good, b.thumbnail, b.regdate as writedate, l.regdate
                from (select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, b.thumbnail, b.regdate as writedate, l.regdate
                        from board_log
                        where actor =   (select friend2 from friend_list
                                            where friend1 = 'tutor@tutor.com')
                                            order by regdate desc
                                        union all
                                        select 3 as cate, num, email as actor, regdate,
                                            from board_test
                                            where actor =   (select feeder from follow
                                                                where follower = 'tutor@tutor.com')
                                        order by regdate desc) l, board_test b
                        where l.num = b.num
                        group by num) b left outer join board_good_test g
                on l.num = b.num
                group by l.num) b left outer join board_comment_test g
        on b.num = g.grp
        group by b.num
    union all
    select 0 as isBoard, l.cate, l.num, l.actor, c.email as writer, c.title, c.content,c.thumbnail, 0 as good, 0 as cmt,c.regdate as writedate, l.regdate, DATE_ADD(b.acc_date,INTERVAL -24 HOUR) as acc_date
        from (select cate, num, actor,regdate 
                from (select cate, num, actor, regdate
                        from course_log
                        where actor =   (select friend2 from friend_list
                                            where friend1 = 'tutor@tutor.com'
                                        union all
                                        select feeder from follow
                                            where follower = 'tutor@tutor.com')
                        order by regdate desc)
                group by num) l, course_test c
        where l.num = c.num
        group by num) feed, users u1, users u2
where feed.actor = u1.email
    and feed.writer = u2.email
order by acc_date;
##########################################################################################################################################################

            -- "from" : "이모씨", //이모씨가
            -- "to" : "김모씨", //김모씨와,
            -- "isTutor"  :  "0", //to의 identify // 선생 "1", 일반 유저 "0"
            -- "from_thumbnail" : "이모씨.png",
            -- "to_thumbnail"    : "김모씨.png"
#####################################################################################################################################
select r.friend_from,concat(u1.last_name,u1.frist_name) as friend_from_name, u1.thumbnail as friend_from_thumbnail, 
        r.friend_to, concat(u2.last_name,u2.frist_name) as friend_to_name, u2.thumbnail as friend_to_thumbnail,u2.identity as isTutor
    from alram_relation r, users u1, users u2
    where r.friend_from = u1.email
    and   r.friend_to = u2.email
    and   r.receiver  = "[수신자 email]"
    and   r.read_yn = "n"
    order by regdate desc;
###############################################################################################################################################

#############################함꺠 아는 친구 숫자####################################################
select friend2, count(score) as score from friend_list
where friend1 in (select friend2 from friend_list
    where friend1 = 'tutor@tutor.com'
    )
group by friend2;

###########################같은 학교 인 사람들#####################################################
select u2.email, 1 as score from user u1,user u2, users info
where u1.email = 'tutor@tutor.com'
    and u1.school_name = u2.school_name;

##########################같은 지역, 같은 나이###################################################
select u2.email, 1 as score from user_info u1,user_info u2, users info
where u1.email = 'tutor@tutor.com'
    and u1.address = u2.address
    and u1.age = u2.age;


select recommend.email, info.name,info.isTutor info.thumbnail,info.address_si,info.address_gu, info.address_gu, sch_info.school_name, sch_info.grade, sum(score) as score, sum(together) as together
    from (
        select u2.email, 1 as score, 0 as together 
            from user_info u1,user_info u2, users info
            where u1.email = 'tutor@tutor.com'
                and u1.address = u2.address
                and u1.age = u2.age
        union all
        select u2.email, 1 as score, 0 as together 
            from user u1,user u2
            where u1.email = 'tutor@tutor.com'
            and u1.school_name = u2.school_name
            and u2.isTutor = '0'
        union all
        select friend2, sum(score*1) as score, 1 as together 
            from friend_list
            where friend1 in (select friend2 from friend_list
                                where friend1 = 'tutor@tutor.com')
        group by friend2) recommend, user_info info, user sch_info
    where recommend.email = info.email
        and recommend.email = sch_info.email
        and info.isTutor = '0';
    group by email
    order by score desc;



select recommend.email, info.name,info.isTutor, info.thumbnail,info.address_si,info.address_gu, info.address_gu, sum(score) as score, count(together) as together
    from (select friend2 as email, sum(score*1) as score, count(score) as together 
            from friend_list
            where friend1 in (select friend2
                                from friend_list
                                where friend1 = 'tutor@tutor.com')
            GROUP BY email
        union all
        select u2.email, 1 as score, 0 as together 
            from user_info u1,user_info u2, users info
            where u1.email = 'tutor@tutor.com'
            and u1.address = u2.address
            and u2.isTutor = '1') recommend, user_info info
    where recommend.email = info.email    
    and info.isTutor = '1';
    group by recommend.email
    order by score desc;

select subjects from tutor_subject
    where email = 'tutor@tutor.com';

















##############################################게시물 리스트####################################################################################
select b.num, b.email as writer,u.name as writer_name, u.thumbnail as writer_thumbnail, b.title, b.content, b.thumbnail, b.cmt, count(*) as good, b.regdate from  
    (select b.num, b.email as writer, b.title, b.content, b.thumbnail, count(*) as cmt, b.regdate from board b, board_comment g
        where writer = 'tutor@tutor.com'
            and b.num = g.grp
        group by num) b, board_good g, user_info u
    where b.num = g.grp
        and b.email = u.email
    group by num
    order by DATE_ADD(b.regdate,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR);
















(select b.cate, b.num, b.actor, b.writer, b.title, b.content, count(*) as good, b.thumbnail, b.regdate as writedate, l.regdate
(select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, b.thumbnail, b.regdate as writedate, l.regdate
                from (select cate, num, actor,regdate 
                        from (select cate, num, actor, regdate
                                from board_log
                                where actor =   (select friend2 from friend_list
                                                    where friend1 = 'tutor@tutor.com')
                            order by regdate desc
                            union all
                            select 3 as cate, num, email as actor, regdate,
                                from board_test
                                where actor =   (select feeder from follow
                                                    where follower = 'tutor@tutor.com')
                            order by regdate desc
                            union all
                            )
                        group by num) l, board_test b
            where l.num = b.num
            group by num) b left outer join board_good_test g
            on b.num = g.grp)





























#log+친구
select cate,
    num,
    actor,
    regdate
from board_log
where actor = (select friend2 from friend
                   where friend1 = 'tutor@tutor.com'
               union all
               select friend1 from friend
                   where friend2 = 'tutor@tutor.com'
               )
group by num;






select * from (
select cate,num,actor,writer,title,content,0 as good,0 as cmt,writedate, regdate,DATE_ADD(accdate,INTERVAL -24 HOUR) as accdate from course_log
union all
select b.cate, b.num, b.actor, b.writer, b.title, b.content, b.good, count(*) cmt, b.writedate, b.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as accdate
		from
			(select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, count(*) as good, b.regdate as writedate, l.regdate, l.acc_date
				from board_log l, board_test b, board_good_test g
				where l.num = b.num and l.num = g.grp
				group by regdate,num) b, board_comment_test cmt
		where b.num = cmt.grp
		group by regdate,num) as log





create view course_log as

select 
    1 as cate,
    num,
    email as actor,
	email as writer,
    title,
    content,
	regdate as writedate,
    regdate,
	regdate as accdate
from
    course

union all
#review + course join for feed
select 
    2 as cate,
    grp as num,
    r.email as actor,
    c.email as writer,
    c.title,
    c.content,
	c.regdate as writedate,
    r.regdate,
    r.regdate as accdate
from
    review r,
    course c;


create view board_log as
#board for feed
select 
    3 as cate,
    num,
    email as actor,
    regdate,
    regdate as acc_date
from
    board_test

union all
#comment + board join for feed
select 
    4 as cate,
    grp as num,
    email as actor,
    regdate,
    regdate as acc_date
from
    board_comment_test

union all
#comment + board join for feed
select 
    5 as cate,
    grp as num,
    email as actor,
    regdate,
    regdate as acc_date
from
    board_good_test;









select 
insert into friend values('friend1','friend2');














##########################################################메인 피드#########################################################################
select  *
from
     (select 1 as isboard,l.cate, l.num, l.actor, b.email as writer, b.title, b.content, b.good,count(*) as cmt,b.isGood b.thumbnail, b.regdate as writedate, l.regdate, DATE_ADD(b.acc_date,INTERVAL -12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
        from (select  b.cate, b.num, b.actor, b.writer, b.title, b.content, b.good, count(*) as isGood, b.thumbnail, b.regdate as writedate, l.regdate
                from (select b.cate, b.num, b.actor, b.writer, b.title, b.content, count(*) as good, b.thumbnail, b.regdate as writedate, l.regdate
                        from (select l.cate, l.num, l.actor, b.email as writer, b.title, b.content, b.thumbnail, b.regdate as writedate, l.regdate
                                from board_log l, board_test b
                                where actor =   (select friend2 from friend_list
                                                    where friend1 = 'tutor@tutor.com')
                                                    order by regdate desc
                                                union all
                                                select 3 as cate, num, email as actor, regdate,
                                                    from board_test
                                                    where actor =   (select feeder from follow
                                                                        where follower = 'tutor@tutor.com')
                                order by regdate desc
                                where l.num = b.num
                                group by num) b left outer join board_good_test g
                        on l.num = b.num
                        group by l.num) b left outer join board_good_test g
                on b.num = g.num and g.email = 'tutor@tutor.com'
                group by b.num) b left outer join board_comment_test g
        on b.num = g.grp
        group by b.num
    union all
    select 0 as isBoard, l.cate, l.num, l.actor, c.email as writer, c.title, c.content,c.thumbnail, 0 as good, 0 as cmt, 0 as isGood,c.regdate as writedate, l.regdate, DATE_ADD(b.acc_date,INTERVAL -24 HOUR) as acc_date
        from (select cate, num, actor,regdate 
                from (select cate, num, actor, regdate
                        from course_log
                        where actor =   (select friend2 from friend_list
                                            where friend1 = 'tutor@tutor.com'
                                        union all
                                        select feeder from follow
                                            where follower = 'tutor@tutor.com')
                        order by regdate desc)
                group by num) l, course_test c
        where l.num = c.num
        group by num) feed, users u1, users u2
where feed.actor = u1.email
    and feed.writer = u2.email
order by acc_date
limit '[page]' 10;
###########################################################################################################################################################################





select cate, num, l.actor, b.email as writer, b.title, b.content, b.thumbnail, b.regdate as writedate, l.regdate
                                from board_log l, board_test b
    

##############################################################이거시 레알#####################################################################################
    select 1 as isBoard, feed.cate, feed.num, feed.email as actor,u2.isTutor as isTutor, u2.name as actor_name, u2.thumbnail as actor_thumbnail
            , b.email as writer ,u1.isTutor as iswriterTutor, u1.name as actor_name, u1.thumbnail as actor_thumbnail
            , b.title, b.content, b.thumbnail, b.good, b.cmt,b.isGood, b.regdate, feed.actdate
            , DATE_ADD(b.regdate,INTERVAL 12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
        from (select b.cate,b.num,b.actor,b.actdate, b.good, count(*) as cmt, b.isGood
            from(select b.cate,b.num,b.actor,b.actdate, b.good, count(*) as isGood
                    from(select b.cate,b.num,b.actor,b.actdate, count(*) as good
                            from(select b.cate,b.num,b.actor,b.actdate
                                    from( select cate,num,actor,regdate
                                            from 
                                            (select cate, num, actor,regdate as actdate
                                                from board_log
                                                where actor =   (select friend2 
                                                                    from friend_list
                                                                    where friend1 = 'tutor@tutor.com')
                                            union all
                                            select 3 as cate, num, email as actor, regdate as actdate
                                                from board_test
                                                where actor =   (select feeder 
                                                                            from follow
                                                                            where follower = 'tutor@tutor.com')
                                            ) b
                                            order by b.regdate) b
                                    group by b.num) b left outer join board_good g
                            on b.num = g.num
                            group by b.num) b left outer join board_good g
                    on b.num = g.num and g.num = 'tutor@tutor.com'
                    group by b.num)) b left outer join board_comment g
            on b.num = g.num
            group by b.num) feed, board b, users u1, users u2
        where feed.num = b.num
        and b.email = u1.email
        and feed.email = u2.emil
        order by acc_date desc
#############################################################################################################################################################



#################################################################################이거시 레알!##############################################################################

select isboard, cate, num, email, actor, isTutor, actor_name, actor_thumbnail, writer, iswriterTutor,actor_name,actor_thumbnail, title, content,good,cmt, isGood, regdate, actdate, acc_date
    from(
            select 1 as isBoard, feed.cate, feed.num, feed.email as actor,u2.isTutor as isTutor, u2.name as actor_name, u2.thumbnail as actor_thumbnail
                        , b.email as writer ,u1.isTutor as iswriterTutor, u1.name as actor_name, u1.thumbnail as actor_thumbnail
                        , b.title, b.content, b.thumbnail, b.good, b.cmt,b.isGood, b.regdate, feed.actdate
                        , DATE_ADD(b.regdate,INTERVAL 12*LOG(10,(count(*)*2)+(good)) HOUR) as acc_date
                    from (select b.cate,b.num,b.actor,b.actdate, b.good, count(*) as cmt, b.isGood
                        from(select b.cate,b.num,b.actor,b.actdate, b.good, count(*) as isGood
                                from(select b.cate,b.num,b.actor,b.actdate, count(*) as good
                                        from(select b.cate,b.num,b.actor,b.actdate
                                                from( select cate,num,actor,actdate
                                                        from 
                                                        (select cate, num, actor,regdate as actdate
                                                            from board_log
                                                            where actor =   (select friend2 
                                                                                from friend_list
                                                                                where friend1 = 'tutor@tutor.com')
                                                        union all
                                                        select 3 as cate, num, email as actor, regdate as actdate
                                                            from board_test
                                                            where actor =   (select feeder 
                                                                                        from follow
                                                                                        where follower = 'tutor@tutor.com')
                                                        ) b
                                                        order by b.actdate) b
                                                group by b.num) b left outer join board_good g
                                        on b.num = g.num
                                        group by b.num) b left outer join board_good g
                                on b.num = g.num and g.num = 'tutor@tutor.com'
                                group by b.num) b left outer join board_comment g
                        on b.num = g.num
                        group by b.num) feed, board b, users u1, users u2
                    where feed.num = b.num
                    and b.email = u1.email
                    and feed.email = u2.emil
                    order by acc_date desc
            union all
            select 0 as isBoard, feed.cate, feed.num, feed.email as actor,u2.isTutor as isTutor, u2.name as actor_name, u2.thumbnail as actor_thumbnail
                        , c.email as writer ,u1.isTutor as iswriterTutor, u1.name as actor_name, u1.thumbnail as actor_thumbnail
                        , c.title, c.one_line as content, c.thumbnail, 0 as good, 0 as cmt,0 asisGood, c.regdate, feed.actdate
                        , DATE_ADD(b.regdate,INTERVAL -24 HOUR) as acc_date
                    from (select cate, num, actor, actdate
                            from (select cate, num, actor, regdate as actdate
                                    from course_log
                                    where actor =   (select friend2 from friend_list
                                                        where friend1 = 'tutor@tutor.com'
                                                    union all
                                                    select feeder from follow
                                                        where follower = 'tutor@tutor.com')
                                    order by regdate desc)
                            group by num) feed, course c, users u1, users u2
                    where feed.num = c.num
                    and c.email = u1.email
                    and feed.email = u2.emil
                    order by acc_date
        ) feed
    order by acc_date
    limit '[page]', 10;









########################################################################################################################################################################
select isboard, cate, num, actor, isTutor, actor_name, actor_thumbnail, writer, iswriterTutor,actor_name,actor_thumbnail, title, content,good,cmt, isGood, regdate, actdate, acc_date
    from(
            select 1 as isBoard, feed.cate, feed.num, feed.actor,u2.isTutor as isTutor, u2.name as actor_name, u2.thumbnail as actor_thumbnail
                        , b.email as writer ,u1.isTutor as iswriterTutor, u1.name as writer_name, u1.thumbnail as writer_thumbnail
                        , b.title, b.content, b.thumbnail, feed.good, feed.cmt,feed.isGood, b.regdate, feed.actdate
                        , DATE_ADD(b.regdate,INTERVAL 12*LOG(10,(feed.cmt*2)+(feed.good)) HOUR) as acc_date
                    from (select b.cate,b.num,b.actor,b.actdate, b.good, count(*) as cmt, b.isGood
                        from(select b.cate,b.num,b.actor,b.actdate, b.good, count(*) as isGood
                                from(select b.cate,b.num,b.actor,b.actdate, count(*) as good
                                        from(select b.cate,b.num,b.actor,b.actdate
                                                from( select cate,num,actor,actdate
                                                        from 
                                                        (select cate, num, actor,regdate as actdate
                                                            from board_log
                                                            where actor =   (select friend2 
                                                                                from friend_list
                                                                                where friend1 = 'tutor@tutor.com')
                                                        union all
                                                        select 3 as cate, num, email as actor, regdate as actdate
                                                            from board_test
                                                            where email =   (select feeder 
                                                                                        from follow
                                                                                        where follower = 'tutor@tutor.com')
                                                        ) b
                                                        order by b.actdate) b
                                                group by b.num) b left outer join board_good g
                                        on b.num = g.grp
                                        group by b.num) b left outer join board_good g
                                on b.num = g.grp and g.email = 'tutor@tutor.com'
                                group by b.num) b left outer join board_comment g
                        on b.num = g.grp
                        group by b.num) feed, board b, user_info u1, user_info u2
                    where feed.num = b.num
                    and b.email = u1.email
                    and feed.actor = u2.email
            union all
            select 0 as isBoard, feed.cate, feed.num, feed.actor,u2.isTutor as isTutor, u2.name as actor_name, u2.thumbnail as actor_thumbnail
                        , c.email as writer ,u1.isTutor as iswriterTutor, u1.name as writer_name, u1.thumbnail as writer_thumbnail
                        , c.title, c.one_line as content, c.thumbnail, 0 as good, 0 as cmt,0 as isGood, c.regdate, feed.actdate
                        , DATE_ADD(c.regdate,INTERVAL 24 HOUR) as acc_date
                    from (select b.cate, b.num, b.actor, b.actdate
                            from (select cate, num, actor, regdate as actdate
                                    from course_log
                                    where actor =   (select friend2 from friend_list
                                                        where friend1 = 'tutor@tutor.com'
                                                    union all
                                                    select feeder from follow
                                                        where follower = 'tutor@tutor.com')
                                    order by regdate desc) b
                            group by b.num) feed, course c, user_info u1, user_info u2
                    where feed.num = c.num
                    and c.email = u1.email
                    and feed.actor = u2.email
        ) feed
    order by acc_date
    limit 1, 10;





















##############################################################################################################################################################################################################################################################################################################################################################



SELECT feed.isboard, feed.cate, feed.num, feed.actor,u1.isTutor AS isTutor, u1.name AS actor_name, u1.thumbnail AS actor_thumbnail, feed.writer ,u2.isTutor AS iswriterTutor, u2.name AS writer_name, u2.thumbnail AS writer_thumbnail, feed.title, feed.content, feed.good, feed.cmt, feed.isGood, feed.regdate, feed.actdate, feed.acc_date
    FROM(
            SELECT 1 AS isBoard, feed.cate, feed.num, feed.actor
                        , b.email AS writer
                        , b.title, b.content, b.thumbnail, feed.good, feed.cmt,feed.isGood, b.regdate, feed.actdate
                        , DATE_ADD(b.regdate,INTERVAL 12*LOG(10,(feed.cmt*2)+(feed.good)) HOUR) AS acc_date
                    FROM (SELECT b.cate,b.num,b.actor,b.actdate, b.good, count(g.email) AS cmt, b.isGood
                        FROM(SELECT b.cate,b.num,b.actor,b.actdate, b.good, count(g.email) AS isGood
                                FROM(SELECT b.cate,b.num,b.actor,b.actdate, count(g.email) AS good
                                        FROM(SELECT b.cate,b.num,b.actor,b.actdate
                                                FROM( SELECT cate,num,actor,actdate
                                                        FROM 
                                                        (SELECT cate, num, actor,regdate AS actdate
                                                            FROM board_log
                                                            WHERE actor IN   (SELECT friend2 AS feeder
                                                                                FROM friend_list
                                                                                WHERE friend1 = 'tutee@tutee.com')
                                                        UNION ALL
                                                        SELECT 3 AS cate, num, email AS actor, regdate AS actdate
                                                            FROM board
                                                            WHERE email IN   (SELECT feeder 
                                                                                        FROM follow
                                                                                        WHERE follower = 'tutee@tutee.com')
                                                        ) b
                                                        ORDER BY b.actdate) b
                                                GROUP BY b.num) b LEFT OUTER JOIN board_good g
                                        ON b.num = g.grp
                                        GROUP BY b.num) b LEFT OUTER JOIN board_good g
                                ON b.num = g.grp and g.email = 'tutee@tutee.com'
                                GROUP BY b.num) b LEFT OUTER JOIN board_comment g
                        ON b.num = g.grp
                        GROUP BY b.num) feed JOIN board b ON feed.num = b.num
            UNION ALL
            SELECT 0 AS isBoard, feed.cate, feed.num, feed.actor
                        , c.email AS writer
                        , c.title, c.one_line AS content, c.thumbnail, 0 AS good, 0 AS cmt,0 AS isGood, c.regdate, feed.actdate
                        , DATE_ADD(c.regdate,INTERVAL 24 HOUR) AS acc_date
                    FROM (SELECT b.cate, b.num, b.actor, b.actdate
                            FROM (SELECT cate, num, actor, regdate AS actdate
                                    FROM course_log
                                    WHERE actor IN   (SELECT friend2 AS feeder FROM friend_list
                                                        WHERE friend1 = 'tutee@tutee.com'
                                                    UNION ALL
                                                    SELECT feeder FROM follow
                                                        WHERE follower = 'tutee@tutee.com')
                                    ORDER BY regdate desc) b
                            GROUP BY b.num) feed JOIN course c ON feed.num = c.num
        ) feed JOIN user_info u1  ON feed.actor = u1.email
                JOIN user_info u2 ON feed.writer = u2.email
    ORDER BY acc_date
    LIMIT 0, 10;




    select recommend.email, info.name,0 as isTutor, info.thumbnail,info.address_si,info.address_gu, info.school_name, info.grade, sum(score) as score, sum(together) as together
    from (
        select u2.email, 1 as score, 0 as together 
            from stu_info u1,stu_info u2
            where u1.email = 'a@a.com'
                and u1.address = u2.address
                and u1.age = u2.age
                and u2.email <> 'a@a.com'
        union all
        select u2.email, 1 as score, 0 as together 
            from user u1,user u2
            where u1.email = 'a@a.com'
            and u1.school_name = u2.school_name
            and u2.email <> 'a@a.com'
        union all
        select friend2, sum(score*1) as score, count(friend2) as together 
            from friend_list
            where friend1 in (select friend2 from friend_list
                                where friend1 = 'a@a.com')
            and friend2 <> 'a@a.com'
        group by friend2) recommend join stu_info info
        on recommend.email = info.email
    group by recommend.email
    order by score desc;









    select recommend.email, info.name,0 as isTutor, info.thumbnail,info.address_si,info.address_gu, sum(score) as score, sum(together) as together
    from (
        select u2.email, 1 as score, 0 as together 
            from user_info u1,user_info u2
            where u1.email = 'a@a.com'
                and u1.address = u2.address
                and u2.email <> 'a@a.com'
        union all
        select friend2, sum(score*1) as score, count(friend2) as together 
            from friend_list
            where friend1 in (select friend2 from friend_list
                                where friend1 = 'a@a.com')
            and friend2 <> 'a@a.com'
        group by friend2) recommend join user_info info
        on recommend.email = info.email
        where info.isTutor = '1';
    group by recommend.email
    order by score desc;





    select recommend.email, info.name,0 as isTutor, info.thumbnail,info.address_si,info.address_gu, sum(score) as score, sum(together) as together
    from (
        select u2.email, 1 as score, 0 as together 
            from user_info u1,user_info u2
            where u1.email = 'a@a.com'
                and u1.address = u2.address
                and u2.email <> 'a@a.com'
        union all
        select friend2, sum(score*1) as score, count(friend2) as together 
            from friend_list
            where friend1 in (select friend2 from friend_list
                                where friend1 = 'a@a.com')
            and friend2 <> 'a@a.com'
        group by friend2) recommend join user_info info
        on recommend.email = info.email
        where info.isTutor = '1'
    group by recommend.email
    order by score desc;














select count(rcm.*) 
    from recommend rcm join review re
    on re.review_num = rcm.review_num
    where re.profile_num = (SELECT profile_num 
                                            FROM review 
                                            WHERE review_num = 79 )



    SELECT count(re.*) FROM recommend AS rcm, review AS re 
            WHERE (SELECT review_num 
                    FROM review 
                    WHERE profile_num = (SELECT profile_num 
                                            FROM review 
                                            WHERE review_num = 79 )) = rcm.review_num;






















select recommend.email, info.name,0 as isTutor, info.thumbnail,info.address_si,info.address_gu, info.school_name, info.grade, sum(score) as score, sum(together) as together
    from (
        select u2.email, 1 as score, 0 as together
            from users u1,users u2 
            where u1.email = ?
            and u1.address = u2.address
            and u2.email <> 'a@a.com'
        union all 
            select feeder, sum(score*1) as score, count(feeder) as together 
            from follow 
            where follower in (select feeder 
                                    from follow 
                                    where follower = ?)
            and feeder <> ?)
            group by feeder) recommend join user_info info
    on recommend.email = info.email
    group by recommend.email
    order by score desc 
limit ?,?






###################################################사람검색########################################################################
select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, u.school_name, u.grade, log(10,lvl.score)+lvl.together as score, lvl.together
    from stu_info u left outer join (select u2.email, 1 as score, 0 as together
                                        from user_info u1, user_info u2
                                        where u1.email = 'a@a.com' and u1.address = u2.address and u2.email <> 'a@a.com' 
                                        union all select 
                                            friend2, sum(score * 1) as score, count(friend2) as together
                                        from
                                            friend_list
                                        where
                                            friend1 in (select friend2
                                                            from friend_list
                                                        where friend1 = 'a@a.com')
                                            and friend2 <> 'a@a.com') lvl
    on u.email = lvl.email
    where name like '%이%'
    order by score;




#############################################################선생님 찾기#############################################################################################



select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, lvl.score+lvl.together as score, sum(lvl.together) as together
    from 
    (select u.email, u.name, u.thumbnail, u.address_si, u.address_gu, 0 as score, 0 as together
        from tutor_info u left outer join tutor_subject s
        on u.email = s.email
        where u.name like '%김%'
            or s.subjects like '%김%') u left outer join (select u2.email, 10 as score, 0 as together
                                        from user_info u1, user_info u2
                                        where u1.email = 'a@a.com' and u1.address = u2.address and u2.email <> 'a@a.com' 
                                        union all select 
                                            friend2, sum(score * 1) as score, count(friend2) as together
                                        from
                                            friend_list
                                        where
                                            friend1 in (select friend2
                                                            from friend_list
                                                        where friend1 = 'a@a.com')
                                            and friend2 <> 'a@a.com') lvl
    on u.email = lvl.email
    group by u.email
    order by score desc;



    async.forEach(arr,function(item){

            item
        });