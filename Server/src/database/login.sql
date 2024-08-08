create database tiendaRopa;
use tiendaRopa;
create table login(
	email varchar(50) not null,
    password varchar(50) not null,
    primary key(email,password)
);

INSERT INTO login(email,password) VALUES
 ('peiteadojoel1@gmail.com','clave1'),
 ('peiteadojoel2@gmail.com','clave2'),
 ('peiteadojoel3@gmail.com','clave3')
 