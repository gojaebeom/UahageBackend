-- ## 우아하게 애플리케이션 개발용 테이블 명세서 V1 ✨ ##

-- 즐겨찾기 ( 북마크 )
create table users_places_bookmarks(
	id serial primary key, 
	user_id bigint not null,
	place_id bigint not null
);

-- 컬럼명 변경
alter table users_places_bookmarks rename column space_id to place_id;

comment on table public.users_places_bookmarks
is '회원과 장소의 N:M 관계 테이블
- 회원은 장소 정보를 즐겨찾기 할 수 있음
';

insert into users_places_bookmarks(user_id, place_id)
values(1, 1); 

-- select U.email, P.
-- from users as U
-- left join places as P


select * from users_places_bookmarks;