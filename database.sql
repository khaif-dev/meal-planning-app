CREATE DATABASE tunakulaDb;
USE tunakulaDb;

-- create user table
CREATE TABLE users(
user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
email VARCHAR(255) UNIQUE NOT NULL,
first_name VARCHAR (255) NOT NULL,
last_name VARCHAR (255) NOT NULL,
password VARCHAR(255) NOT NULL
);

-- Create the user_dietary_preferences table
CREATE TABLE user_dietary_preferences (
    id CHAR(30) PRIMARY KEY DEFAULT (UUID()),
    --  ON DELETE CASCADE: If the parent record is deleted, automatically delete all the child records that are linked to it.
    user_id CHAR(30) NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    preference_key VARCHAR(100) NOT NULL UNIQUE,
    preference_value BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the user_pantry table
CREATE TABLE user_pantry (
    pantry_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) REFERENCES users(user_id) ON DELETE CASCADE,
    ingredient_id CHAR(36) NOT NULL REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
    expiry_date DATE NULL,
    quantity DOUBLE PRECISION NOT NULL,
    unit VARCHAR(50) NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating recipe categories table 
CREATE TABLE recipe_categories (
    category_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Adding categories name 
INSERT INTO recipe_categories(name)
VALUES('Breakfast'),('Lunch'),('Dinner'),
('Dessert'),('Snack'),('Appetizer'),
('Salad'),('Soup'),('Side Dish'),('Main Course'),
('Beverage'),('weaning'),('hosting'),('post workou'),
('pre workout');


 




