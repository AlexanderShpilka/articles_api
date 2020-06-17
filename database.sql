CREATE DATABASE articles_database;

-- \c articles_database
CREATE TABLE articles
(
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255)
);
