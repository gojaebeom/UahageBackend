-- ## 우아하게 애플리케이션 개발용 테이블 명세서 V1 ✨ ##

-- 우아하게 사용자 테이블
create table users(
	id serial primary key,
	email varchar(50) unique,
	nickname varchar(50) unique,
	profile_url varchar(200),
	baby_gender char(1), -- 아기 성별 ( F:여성, M:남성)
	baby_birthday varchar(12), -- 아기 생일
	parent_age smallint, -- 부모 연령대
	rf_token text,
	created_at timestamp default now(), -- 생성일
	updated_at timestamp -- 수정일
);
-- drop table users -- table drop
-- alter table users alter column nickname drop not null; -- email 컬럼에 유니크 속성 추가 ( 생성 당시에 못해줬음 )
-- alter table users drop column nickname;
-- alter table users add column email varchar(50) unique;
-- alter table users add column nickname varchar(20) unique;
-- alter table users add column roles varchar(10) default "USER" -- "ADMIN"/"MANAGER"/"USER"

-- alter table users add column is_deleted smallint default 0;
-- alter table users add column deleted_at timestamp;
comment on table public.users
is '우아하게 사용자 정보 테이블';

select * from users;
select * from users where id = 1;
insert into users(email, password, nickname, profile_url, baby_gender, baby_birthday, parent_age)
values ('const.gjb@gmail.com', '123123', 'gojaebeom', '/users/profile.png', 'M', '19950621', 20);