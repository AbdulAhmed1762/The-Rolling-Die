CREATE TABLE IF NOT EXISTS games (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL CHECK ( price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >=0)

);


CREATE TABLE IF NOT EXISTS managers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL

);