CREATE DATABASE pantry;

CREATE TABLE lists(
    list_id UUID PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE units(
    unit_id UUID PRIMARY KEY,
    name VARCHAR(255),
    list_id UUID REFERENCES lists(list_id) ON DELETE CASCADE
);

CREATE TABLE items(
    item_id UUID PRIMARY KEY,
    name VARCHAR(255),
    amount INT,
    unit VARCHAR(255),
    date VARCHAR(255),
    comments VARCHAR(255),
    imageSrc VARCHAR(255),
    list_id UUID REFERENCES lists(list_id) ON DELETE CASCADE
);