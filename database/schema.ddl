DROP SCHEMA IF EXISTS TSPORTS CASCADE;
CREATE SCHEMA TSPORTS;
SET search_path TO TSPORTS;


DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Location CASCADE;
DROP TABLE IF EXISTS Sports CASCADE;
DROP TABLE IF EXISTS Interests CASCADE;
DROP TABLE IF EXISTS PlaySport CASCADE;
DROP TABLE IF EXISTS Friends_Status CASCADE;
DROP TABLE IF EXISTS Friends CASCADE;
DROP TABLE IF EXISTS Update_Friends CASCADE;
DROP TABLE IF EXISTS Conversation CASCADE;
DROP TABLE IF EXISTS Conversation_Reply CASCADE;
DROP TABLE IF EXISTS Event CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Event_Conversation_Reply CASCADE;



CREATE TABLE Users
(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(40) NOT NULL,
	birthday DATE,
	gender VARCHAR(6) ,
	height INTEGER,
	weight DECIMAL,
	email VARCHAR(255) UNIQUE NOT NULL,
	phone VARCHAR(15),
	campus VARCHAR(15),
	password text NOT NULL,
	about text,
	fbID VARCHAR(20)
	createdAt TIMESTAMP DEFAULT now(),
	updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE Location(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
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

CREATE TABLE PlaySport(
	sportid INTEGER REFERENCES Sports(id) ON DELETE CASCADE,
	userid  INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	sumRating REAL DEFAULT 0.0,
	totalNumOfRatings INTEGER DEFAULT 0,
	PRIMARY KEY(sportid, userid)
);

/*
	status_text: the state of this friend. 
				 it can be the following states
				
				id  Meaning
				0   Pending Friend Request
				1   Confirm Friend Request
				2   You
*/
CREATE TABLE Friends_Status(
	id serial PRIMARY KEY,
	status_text VARCHAR(45)
);

CREATE TABLE Friends(
	friend_one INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	friend_two INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	status INTEGER REFERENCES Friends_Status(id),
	createdAt TIMESTAMP DEFAULT now(),
	CONSTRAINT must_be_different CHECK(friend_one != friend_two),
	PRIMARY KEY(friend_one, friend_two)
);


CREATE TABLE Update_Friends(
	id SERIAL PRIMARY KEY,
	update_status VARCHAR(45),
	userid INTEGER REFERENCES Users(id) ON DELETE CASCADE
);

-- status: Open or closed
CREATE TABLE Conversation(
	id serial PRIMARY KEY,
	from_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	to_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	time TIMESTAMP DEFAULT now(),
);

/*
	status: Read/Unread/Deleted
*/

CREATE TABLE Conversation_Reply(
	id serial PRIMARY KEY,
	from_user INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	reply_text text NOT NULL,
	sent TIMESTAMP DEFAULT now(),
	conversation_id INTEGER REFERENCES Conversation(id)
);


CREATE TABLE Event(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	location INTEGER REFERENCES Location(id),
	max_Number_Of_Players INTEGER,
	attending INTEGER DEFAULT 0,
	time Date,
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


CREATE TABLE Event_Conversation_Reply(
	id serial PRIMARY KEY,
	sentBy INTEGER REFERENCES Users(id) ON DELETE CASCADE,
	reply_text text,
	sent TIMESTAMP DEFAULT now(),
	conversation_id INTEGER REFERENCES Event(id) NOT NULL
);
