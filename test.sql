#1.모든 유저 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`users` (
  `email` VARCHAR(100) NOT NULL,
  `pw` VARCHAR(500) NOT NULL,
  `isTutor` TINYINT NOT NULL DEFAULT 0,
  `last_name` VARCHAR(10) NOT NULL,
  `first_name` VARCHAR(10) NOT NULL,
  `thumbnail` VARCHAR(300) NULL,
  `photo` VARCHAR(300) NULL,
  `address_si` VARCHAR(10) NOT NULL,
  `address_gu` VARCHAR(10) NOT NULL,
  `gender` CHAR(1) NULL,
  `birthday` DATE NULL,
  `about_me` VARCHAR(1000) NOT NULL,
  `leave_yn` CHAR(1) NOT NULL DEFAULT 'n',
  `regdate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `facebook` VARCHAR(800) NULL,
  `kakaotalk` VARCHAR(800) NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;

#2.팔로우 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`follow` (
  `feeder` VARCHAR(100) NOT NULL,
  `follower` VARCHAR(100) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `read_yn` CHAR(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`feeder`, `follower`),
  INDEX `fk_follow_users2_idx` (`follower` ASC),
  CONSTRAINT `fk_follow_users1`
    FOREIGN KEY (`feeder`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_follow_users2`
    FOREIGN KEY (`follower`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#3.학교테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`school` (
  `school_name` VARCHAR(50) NOT NULL,
  `school_grade` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`school_name`))
ENGINE = InnoDB;

#4.일반인 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`user` (
  `email` VARCHAR(100) NOT NULL,
  `school_name` VARCHAR(50) NULL,
  `grade` TINYINT NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_user_school1_idx` (`school_name` ASC),
  CONSTRAINT `fk_user_users1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_school1`
    FOREIGN KEY (`school_name`)
    REFERENCES `hello_test`.`school` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#5.친구테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`friend` (
  `friend1` VARCHAR(100) NOT NULL,
  `friend2` VARCHAR(100) NOT NULL,
  `agree` CHAR(1) NOT NULL DEFAULT 'n',
  `regdate` VARCHAR(45) NOT NULL DEFAULT 'current_timestamp',
  PRIMARY KEY (`friend1`, `friend2`),
  INDEX `fk_friend_users2_idx` (`friend2` ASC),
  CONSTRAINT `fk_friend_users1`
    FOREIGN KEY (`friend1`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_friend_users2`
    FOREIGN KEY (`friend2`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#6.선생님 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`tutor` (
  `email` VARCHAR(100) NOT NULL,
  `academic` VARCHAR(500) NULL,
  `etc` VARCHAR(1000) NULL,
  PRIMARY KEY (`email`),
  CONSTRAINT `fk_tutor_users1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#7.경력테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`career` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `fromdate` DATE NOT NULL,
  `todate` DATE NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`),
  INDEX `fk_table1_Tutor1_idx` (`email` ASC),
  CONSTRAINT `fk_table1_Tutor1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`tutor` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#8.선생님 주소테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`totur_url` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`num`),
  INDEX `fk_totur_page_Tutor1_idx` (`email` ASC),
  CONSTRAINT `fk_totur_page_Tutor1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`tutor` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#9.과목 리스트
CREATE TABLE IF NOT EXISTS `hello_test`.`subject_list` (
  `subjects` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`subjects`))
ENGINE = InnoDB;

#선생님 과목
CREATE TABLE IF NOT EXISTS `hello_test`.`tutor_subject` (
  `email` VARCHAR(100) NOT NULL,
  `subjects` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`subjects`, `email`),
  INDEX `fk_tutor_subject_Tutor1_idx` (`email` ASC),
  CONSTRAINT `fk_tutor_subject_Tutor1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`tutor` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tutor_subject_subject_list1`
    FOREIGN KEY (`subjects`)
    REFERENCES `hello_test`.`subject_list` (`subjects`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#10.수업 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`course` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `thumbnail` VARCHAR(300) NULL,
  `photo` VARCHAR(300) NULL,
  `title` VARCHAR(20) NOT NULL,
  `one_line` VARCHAR(100) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `del_yn` CHAR(1) NOT NULL DEFAULT 'n',
  `update` TIMESTAMP NULL,
  PRIMARY KEY (`num`),
  INDEX `fk_course_tutor1_idx` (`email` ASC),
  CONSTRAINT `fk_course_tutor1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`tutor` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


#11.수업 강의 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`course_subject` (
  `num` INT NOT NULL,
  `subjects` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`num`, `subjects`),
  INDEX `fk_course_subject_subject_list1_idx` (`subjects` ASC),
  CONSTRAINT `fk_course_subject_course1`
    FOREIGN KEY (`num`)
    REFERENCES `hello_test`.`course` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_subject_subject_list1`
    FOREIGN KEY (`subjects`)
    REFERENCES `hello_test`.`subject_list` (`subjects`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#12.리뷰 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`review` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `grp` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update` TIMESTAMP NULL,
  INDEX `fk_review_class1_idx` (`grp` ASC),
  PRIMARY KEY (`num`),
  CONSTRAINT `fk_review_class1`
    FOREIGN KEY (`grp`)
    REFERENCES `hello_test`.`course` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#13.리뷰 좋아요
CREATE TABLE IF NOT EXISTS `hello_test`.`review_good` (
  `grp` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`grp`, `email`),
  CONSTRAINT `fk_review_good_review1`
    FOREIGN KEY (`grp`)
    REFERENCES `hello_test`.`review` (`grp`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#게시물 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`board` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `thumbnail` VARCHAR(300) NULL,
  `video1` VARCHAR(300) NULL,
  `video2` VARCHAR(300) NULL,
  `url1` VARCHAR(300) NULL,
  `url2` VARCHAR(300) NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `del_yn` CHAR(1) NOT NULL DEFAULT 'n',
  `update` TIMESTAMP NULL,
  PRIMARY KEY (`num`),
  INDEX `fk_board_users1_idx` (`email` ASC),
  CONSTRAINT `fk_board_users1`
    FOREIGN KEY (`email`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#댓글 테이블
CREATE TABLE IF NOT EXISTS `hello_test`.`board_comment` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `grp` INT NOT NULL,
  `grp_num` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update` TIMESTAMP NULL,
  PRIMARY KEY (`num`),
  INDEX `fk_board_comment_board1_idx` (`grp` ASC),
  CONSTRAINT `fk_board_comment_board1`
    FOREIGN KEY (`grp`)
    REFERENCES `hello_test`.`board` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#게시물 사진
CREATE TABLE IF NOT EXISTS `hello_test`.`board_photo` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `grp` INT NOT NULL,
  `grp_num` INT NOT NULL,
  `photo` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`num`),
  CONSTRAINT `fk_table1_board1`
    FOREIGN KEY (`grp`)
    REFERENCES `hello_test`.`board` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#게시물 좋아요
CREATE TABLE IF NOT EXISTS `hello_test`.`board_good` (
  `grp` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `regdate` VARCHAR(45) NULL,
  PRIMARY KEY (`grp`, `email`),
  CONSTRAINT `fk_board_good_board1`
    FOREIGN KEY (`grp`)
    REFERENCES `hello_test`.`board` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#메세지
CREATE TABLE IF NOT EXISTS `hello_test`.`message` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(100) NOT NULL,
  `to` VARCHAR(100) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `senddate` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `read_ok` CHAR(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`num`),
  INDEX `fk_message_users1_idx` (`from` ASC),
  INDEX `fk_message_users2_idx` (`to` ASC),
  CONSTRAINT `fk_message_users1`
    FOREIGN KEY (`from`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_users2`
    FOREIGN KEY (`to`)
    REFERENCES `hello_test`.`users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

#공지사항
CREATE TABLE IF NOT EXISTS `hello_test`.`notice` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `photo` VARCHAR(300) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`num`))
ENGINE = InnoDB;

#관계 업데이트
CREATE TABLE IF NOT EXISTS `hello_test`.`alram_relation` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `receiver` VARCHAR(100) NOT NULL,
  `from` VARCHAR(100) NOT NULL,
  `to` VARCHAR(100) NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recive_yn` CHAR(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`num`))
ENGINE = InnoDB