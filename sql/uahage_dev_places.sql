-- ## 우아하게 애플리케이션 개발용 테이블 명세서 V1 ✨ ##

-- 유아 관련 장소 테이블 ( 크롤링 데이터베이스 )
create table places(
	id serial primary key,
	space_code smallint not null,
	name varchar(100) not null,
	address varchar(100) not null,
	phone varchar(20),
	lat decimal not null,
	lon decimal not null,
	add_info json
);
comment on table public.places
is '유아 관련 장소 정보 제공 테이블
- 크롤링 또는 excel 파일을 통해 제공자 측에서 업데이트
- 유저가 즐겨찾기할 수 있음';

select * from places;
select * from places where place_code = 1;