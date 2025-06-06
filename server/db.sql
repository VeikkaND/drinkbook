DROP TABLE IF EXISTS drink, ingredient, drink_ingredient, users;

CREATE TABLE drink (
    drink_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name varchar(255) NOT NULL,
    steps text,
    stars integer NOT NULL DEFAULT 0,
    color varchar(255) NOT NULL,
    glass varchar(255) NOT NULL
);

CREATE TABLE ingredient (
    ingredient_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL UNIQUE
);

CREATE TABLE drink_ingredient (
    drink_id integer REFERENCES drink ON DELETE CASCADE,
    ingredient_id integer REFERENCES ingredient ON DELETE CASCADE,
    amount real NOT NULL,
    unit VARCHAR(255),
    PRIMARY KEY (drink_id, ingredient_id)
);

CREATE TABLE users (
    user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    created_drinks integer[],
    starred_drinks integer[]
);

INSERT INTO drink (name, color, glass) 
VALUES ('drink1', 'red', 'highball'), ('drink2', 'red', 'cocktail');

INSERT INTO ingredient (name) VALUES 
('vodka'), ('juice'), ('lime');

INSERT INTO drink_ingredient VALUES 
(1, 1, 3, 'cl'), 
(1, 2, 6, 'cl'),
(2, 1, 3, 'cl'),
(2, 2, 9, 'cl'),
(2, 3, 1.5, 'cl'); 