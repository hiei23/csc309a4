DROP SCHEMA IF EXISTS TSPORTS CASCADE;
CREATE SCHEMA TSPORTS;
SET search_path TO TSPORTS;


DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Interests CASCADE;
DROP TABLE IF EXISTS Sports CASCADE;
DROP TABLE IF EXISTS PlaySport CASCADE;
DROP TABLE IF EXISTS Friends CASCADE;
DROP TABLE IF EXISTS Update_Friends CASCADE;
DROP TABLE IF EXISTS Friends_Status CASCADE;
DROP TABLE IF EXISTS Conversation CASCADE;
DROP TABLE IF EXISTS Conversation_Reply CASCADE;
DROP TABLE IF EXISTS Team_Conversation CASCADE;
DROP TABLE IF EXISTS Team_Conversation_Reply CASCADE;
DROP TABLE IF EXISTS Event CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Sessions CASCADE;


CREATE TABLE Users
(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(40) NOT NULL,
	birthday DATE NOT NULL,
	gender VARCHAR(6) ,
	height INTEGER,
	weight DECIMAL,
	email VARCHAR(255) UNIQUE NOT NULL,
	phone VARCHAR(15) NOT NULL,
	campus VARCHAR(15)NOT NULL,
	password text NOT NULL,
	about text,
	createdAt TIMESTAMP DEFAULT now(),
	updatedAt TIMESTAMP DEFAULT now()
);


CREATE TABLE Sports(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);


CREATE TABLE Interests(
	userid INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	sportid INTEGER REFERENCES Sports(id) ON DELETE CASCADE,
	PRIMARY KEY(userid, sportid)
);

CREATE TABLE Friends(
	friend_one INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	friend_two INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	status INTEGER,
	createdAt TIMESTAMP DEFAULT now(),
	CONSTRAINT must_be_different CHECK(friend_one != friend_two),
	PRIMARY KEY(friend_one, friend_two)
);


CREATE TABLE Friends_Status(
	id serial PRIMARY KEY,
	status_text VARCHAR(45)
);

CREATE TABLE Update_Friends(
	id SERIAL PRIMARY KEY,
	update_status VARCHAR(45),
	userid INTEGER REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE Conversation(
	id serial PRIMARY KEY,
	from_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	to_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	time TIMESTAMP DEFAULT now(),
	status VARCHAR(50) NOT NULL
);


CREATE TABLE Conversation_Reply(
	id serial PRIMARY KEY,
	from_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	reply_text text NOT NULL,
	sent TIMESTAMP DEFAULT now(),
	status VARCHAR(50) NOT NULL,
	conversation_id INTEGER REFERENCES Conversation(id)
);


CREATE TABLE PlaySport(
	sportid INTEGER REFERENCES Sports(id) ON DELETE CASCADE,
	userid  INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	rating  DECIMAL,
	PRIMARY KEY(sportid, userid)
);


CREATE TABLE Event(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	Location VARCHAR(255) NOT NULL,
	max_Number_Of_Players INTEGER,
	attending INTEGER,
	time TIMESTAMP,
	createdAt TIMESTAMP DEFAULT now(),
	updatedAt TIMESTAMP DEFAULT now(),
	CONSTRAINT capacity_reached CHECK (max_Number_Of_Players - attending >= 0)
);

--Matching 1 event to many people
CREATE TABLE Events(
	id INTEGER REFERENCES Event(id) ON DELETE CASCADE,
	userid INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	PRIMARY KEY(id, userid)
);

--Matches 1 event to 1 conversation which 1 conversation matches many people
CREATE TABLE Event_Conversation(
	id INTEGER UNIQUE REFERENCES Event(id),
	from_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	to_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	time TIMESTAMP DEFAULT now(),
	status VARCHAR(50) NOT NULL
);


CREATE TABLE Event_Conversation_Reply(
	id serial PRIMARY KEY,
	from_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	reply_text text,
	sent TIMESTAMP DEFAULT now(),
	status VARCHAR(50) NOT NULL,
	conversation_id INTEGER REFERENCES Event_Conversation(id)
);
