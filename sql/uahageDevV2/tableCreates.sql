-- 장소: 음식점/카페 카테고리
create table p_restaurant_categories(
  id serial primary key,
  name varchar(50) not null unique,
  created_at timestamp default now(),
  updated_at timestamp,
  deleted_at timestamp,
  is_deleted boolean default false
);

-- 장소: 음식점/카페
create table p_restaurants(
    id serial primary key,
    category_id int not null,
    name varchar(100) not null unique,
    address varchar(100) not null unique,
    phone varchar(20) not null unique,
    lat decimal not null,
    lon decimal not null,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(category_id)
    references p_restaurant_categories(id)
    on delete cascade
);
alter table 

-- 장소 : 음식점/카페 이미지
create table p_restaurant_images(
    id serial primary key,
    restaurant_id int not null,
    image_path varchar(100),
    preview_image_path varchar(100),
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(restaurant_id)
    references p_restaurants(id)
    on delete cascade
);

-- 장소 : 음식점/카페 즐겨찾기
create table p_restaurant_bookmarks(
    id serial primary key,
    user_id int not null,
    restaurant_id int not null,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(user_id)
    references users(id)
    on delete cascade,
    foreign key(restaurant_id)
    references p_restaurants(id)
    on delete cascade
);

-- 장소 : 음식점/카페 리뷰
create table p_restaurant_reviews(
    id serial primary key,
    user_id int not null,
    restaurant_id int not null,
    description text not null,
    total_rating smallint default 1,
    taste_rating smallint default 1,
    cost_rating smallint default 1,
    service_rating smallint default 1,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(user_id)
    references users(id)
    on delete cascade,
    foreign key(restaurant_id)
    references p_restaurants(id)
    on delete cascade
);

-- 장소 : 음식점/카페 리뷰 이미지
create table p_restaurant_review_images(
    id serial primary key,
    restaurant_id int not null,
    image_path varchar(100),
    preview_image_path varchar(100),
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(restaurant_id)
    references p_restaurants(id)
    on delete cascade
);

-- 장소: 음식점/카페 리뷰 신고 카테고리
create table p_restaurant_review_declaration_categories(
    id serial primary key,
    name varchar(50) not null unique,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false
);

-- 장소: 음식점/카페 리뷰 신고
create table p_restaurant_review_declarations(
    id serial primary key,
    category_id int not null,
    user_id int not null,
    restaurant_id int not null,
    description text not null,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(category_id)
    references p_restaurant_review_declaration_categories(id)
    on delete cascade,
    foreign key(user_id)
    references users(id)
    on delete cascade,
    foreign key(restaurant_id)
    references p_restaurants(id)
    on delete cascade
);

-- 장소: 병원
create table p_hospitals(
    id serial primary key,
    name varchar(100) not null unique,
    address varchar(100) not null unique,
    phone varchar(20) not null unique,
    lat decimal not null,
    lon decimal not null,
    examination_items varchar(100) not null,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false
);

-- 장소: 어린이집
create table p_day_care_centers(
    id serial primary key,
    name varchar(100) not null unique,
    address varchar(100) not null unique,
    phone varchar(20) not null unique,
    lat decimal not null,
    lon decimal not null,
    use_bus boolean,
    employees smallint,
    rooms smallint,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false
);

-- 장소: 키즈카페
create table p_kid_cafes(
    id serial primary key,
    name varchar(100) not null unique,
    address varchar(100) not null unique,
    phone varchar(20) not null unique,
    lat decimal not null,
    lon decimal not null,
    admission_fee varchar(50),
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false
);

-- 장소: 체험관
create table p_experience_halls(
    id serial primary key,
    name varchar(100) not null unique,
    address varchar(100) not null unique,
    phone varchar(20) not null unique,
    lat decimal not null,
    lon decimal not null,
    admission_fee varchar(50),
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false
);

-- 회원
create table users(
    id serial primary key,
    email varchar(50) not null unique,
    nickname varchar(20) not null unique,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false
);

-- 회원 상세
create table user_details(
    id serial primary key,
    user_id int not null,
    age varchar(20),
    baby_gender varchar(10),
    baby_birthday varchar(20),
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(user_id)
    references users(id) on delete cascade
);

-- 회원 사진
create table user_images(
    id serial primary key,
    user_id int not null,
    image_path varchar(100),
    preview_image_path varchar(100),
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(user_id)
    references users(id) on delete cascade
);

-- 회원 팔로우
create table user_follows(
    id serial primary key,
    follower_id int not null,
    following_id int not null,
    created_at timestamp default now(),
    updated_at timestamp,
    deleted_at timestamp,
    is_deleted boolean default false,
    foreign key(follower_id)
    references users(id) on delete cascade,
    foreign key (following_id)
    references users(id) on delete cascade
);

select u.email, u.nickname, ud.age, ud.baby_gender, ud.baby_birthday
from users as u
left join user_details as ud
on u.id = ud.user_id;

select *
from users
where id = (
        select uf.follower_id
        from users as u
        left join user_follows uf on u.id = uf.follower_id
);




