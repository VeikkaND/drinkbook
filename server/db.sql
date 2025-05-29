DROP TABLE IF EXISTS drink, ingredient, drink_ingredient;

CREATE TABLE drink (
    drink_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name varchar(255) NOT NULL,
    steps text
);

CREATE TABLE ingredient (
    ingredient_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL
);

CREATE TABLE drink_ingredient (
    drink_id integer REFERENCES drink ON DELETE CASCADE,
    ingredient_id integer REFERENCES ingredient ON DELETE CASCADE,
    amount real NOT NULL,
    unit VARCHAR(255),
    PRIMARY KEY (drink_id, ingredient_id)
);

INSERT INTO drink (name) VALUES ('drink1'), ('drink2');

INSERT INTO ingredient (name) VALUES 
('vodka'), ('juice'), ('lime');

INSERT INTO drink_ingredient VALUES 
(1, 1, 3, 'cl'), 
(1, 2, 6, 'cl'),
(2, 1, 3, 'cl'),
(2, 2, 9, 'cl'),
(2, 3, 1.5, 'cl'); 