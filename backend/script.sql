create table tags
(
    tag_name varchar not null
        constraint tags_pk
            primary key
);

alter table tags
    owner to admin;

create table admins
(
    admin_login    varchar not null
        constraint users_pk
            primary key,
    admin_password varchar not null
);

alter table admins
    owner to admin;

insert into admins values ('admin', '$2b$10$FvU9Ia1ttY8Jd9PbofaqC.R/If/zKcMbCVbzzA6KsXgywwctoCaGm');

create table users
(
    user_name varchar not null
        constraint feedback_authors_pk
            primary key
);

alter table users
    owner to admin;

create table post_types
(
    type_name varchar not null
        constraint post_types_pk
            primary key
);

alter table post_types
    owner to admin;

insert into post_types values ('reflection'), ('story');

create table posts
(
    title         varchar not null
        constraint reflections_pk
            primary key,
    body          varchar not null,
    type          varchar not null
        constraint posts_post_types_type_name_fk
            references post_types
            on update cascade on delete cascade,
    creation_date date    not null
);

alter table posts
    owner to admin;

create table feedback
(
    item_id       uuid                 not null
        constraint feedback_pk
            primary key,
    unread        boolean default true not null,
    creation_date date                 not null,
    subject       varchar              not null
        constraint feedback_posts_title_fk
            references posts
            on update cascade on delete cascade,
    user_name     varchar              not null
        constraint feedback_users_user_name_fk
            references users
            on update cascade on delete cascade,
    body          varchar              not null,
    contacts      varchar
);

alter table feedback
    owner to admin;

create table posts_tags
(
    title    varchar not null
        constraint titles_tags_posts_title_fk
            references posts
            on update cascade on delete cascade,
    tag_name varchar not null
        constraint titles_tags_tags_tag_name_fk
            references tags
            on update cascade on delete cascade,
    constraint titles_tags_pk
        primary key (title, tag_name)
);

alter table posts_tags
    owner to admin;

create table quotes
(
    item_id       uuid    not null
        constraint quotes_pk
            primary key,
    author        varchar,
    body          varchar not null,
    creation_date date    not null
);

alter table quotes
    owner to admin;


