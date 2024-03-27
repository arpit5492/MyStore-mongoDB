create table products (
    id serial,
    pName varchar(200) not null,
    price real not null,
    image text not null
);

create table users (
	user_id int auto_increment primary key,
    username varchar(200) not null unique,
    password varchar(200) not null    
);