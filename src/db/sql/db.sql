

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



--password123
INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john.doe@example.com', '$2a$12$ooRa8Ljpq8Tm09FwVQhPIuGTOlUGxSVHG8F2Ru953N5Yb2yS.uYpa');

--securePass!
INSERT INTO users (username, email, password)
VALUES ('jane_smith', 'jane.smith@example.com', '$2a$12$oNtKf0pGbK1Ipsi0qrUVR.iD38hOjKP6SPFfE.ckgleM8wj4P5M26');

--demo123
INSERT INTO users (username, email, password)
VALUES ('demo_user', 'demo@gmail.com', '$2a$12$QiepXhDX.J3qcLRWvGtIVetMnhin.ypK75el01uiE9sM5FP5eVBne');


CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    year INTEGER NOT NULL
);

INSERT INTO movies (name, year)
VALUES ('Inception', 2010);
INSERT INTO movies (name, year)
VALUES ('The Matrix', 1999);
INSERT INTO movies (name, year)
VALUES ('Interstellar', 2014);
INSERT INTO movies (name, year)
VALUES ('Dancing with Wolves', 1990);
INSERT INTO movies (name, year)
VALUES ('Demolition Man', 1993);
INSERT INTO movies (name, year)
VALUES ('Casino', 1995);



CREATE TABLE usermovies (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id)
);
