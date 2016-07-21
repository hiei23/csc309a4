
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Notifications CASCADE;
DROP TABLE IF EXISTS Friends CASCADE;
DROP TABLE IF EXISTS Sports CASCADE;
DROP TABLE IF EXISTS Interests CASCADE;
DROP TABLE IF EXISTS Event CASCADE;
DROP TABLE IF EXISTS Event EventUsers;

CREATE TABLE Users
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    birthday DATE,
    gender VARCHAR(6) ,
    height INTEGER,
    weight DECIMAL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15),
    campus VARCHAR(15),
    password text,
    about text,
    createdAt TIMESTAMP DEFAULT now(),
    ProfileImage text,
    fbid text
) ;

--Used to display to icon numbers when the user first logs in
CREATE TABLE UnreadNotifications
(
    userid INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    numfriendreqs INTEGER,
    nummessages INTEGER,
    numnotifications INTEGER,
    PRIMARY KEY(userid)
);

--Status
--0 means pending, 1 means friends
CREATE TABLE Friends
(
    friend_one INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    friend_two INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    status INTEGER,
    CONSTRAINT must_be_different CHECK(friend_one != friend_two),
    PRIMARY KEY(friend_one, friend_two)
);



CREATE TABLE pp
(
p1 BIGINT
);

INSERT INTO pp (p1) VALUES(1060690543979710);

--1: cycling
--2: waterpolo
--3: squash
--4: boxing
--5: taekwondo
--6: basketball
--7: tabletennis
--8: tennis
--9: volleyball
--10: football
--11: swimming
CREATE TABLE Sports
(
    sportid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE Interests
(
    userid INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    sportid INTEGER REFERENCES Sports(sportid) ON DELETE CASCADE,
    PRIMARY KEY(userid, sportid)
);


CREATE TABLE Event
(
    Eventid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location text,
    numppl INTEGER,
    attendance INTEGER, --Initially 1 (The Admin who created the event)
    DateTime TIMESTAMP,
    EndTime TIME,
    Description text,
    EventType text,
    EventTypeID INTEGER REFERENCES Sports(sportid) ON DELETE CASCADE, --The unique sport ID
    EventAdminID INTEGER REFERENCES Users(id) ON DELETE CASCADE
);



--The users attending each Event
CREATE TABLE EventUsers
(
    id INTEGER REFERENCES Event(Eventid) ON DELETE CASCADE,
    userid INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    PRIMARY KEY(id, userid)
);


CREATE TABLE EventGroupChat
(
    eventid INTEGER REFERENCES Event(Eventid) ON DELETE CASCADE,
    sentById INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    chatmessage text,
    MessageTime TIMESTAMP DEFAULT now()
);







INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 1, 'Hi Everybody!', '2016 07 20'::timestamp);
INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 4, 'Bye Guyz!', '2016 07 21'::timestamp );
INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 1, 'Take Care',  '2016-07-22 21:45:00'::timestamp);
INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 1, 'YOYOY Exam time',  '2016-07-23 21:45:00'::timestamp);
INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 2, 'Stop am studying',  '2016-07-23 21:46:00'::timestamp);
INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 4, 'Parham Not Again!!',  '2016-07-23 21:47:00'::timestamp);
INSERT INTO EventGroupChat (eventid, sentById, chatmessage, MessageTime ) VALUES(11, 1, 'Wazzup boyzz!!',  '2016-07-23 21:49:00'::timestamp);





--DATA

INSERT INTO Sports (name) VALUES('cycling');
INSERT INTO Sports (name) VALUES('waterpolo');
INSERT INTO Sports (name) VALUES('squash');
INSERT INTO Sports (name) VALUES('boxing');
INSERT INTO Sports (name) VALUES('taekwondo');
INSERT INTO Sports (name) VALUES('basketball');
INSERT INTO Sports (name) VALUES('tabletennis');
INSERT INTO Sports (name) VALUES('tennis');
INSERT INTO Sports (name) VALUES('volleyball');
INSERT INTO Sports (name) VALUES('football');
INSERT INTO Sports (name) VALUES('swimming');



INSERT INTO users (first_name, last_name, birthday, gender, height, weight, email, phone, campus, password, about, createdAt, ProfileImage) VALUES('parham', 'oghabi', '2016-07-18'::date, 'male', 180, 70, 'poghabi@gmail.com', '647-889-0094', 'St.George', 'poghabi@gmail.com', 'I Love Food', now(), './assets/images/DefaultProfilePic.jpg');

INSERT INTO Interests (userid, sportid) VALUES(1, 1);
INSERT INTO Interests (userid, sportid) VALUES(1, 3);
INSERT INTO Interests (userid, sportid) VALUES(1, 6);

INSERT INTO UnreadNotifications (userid, numfriendreqs, nummessages, numnotifications) VALUES(1, 2, 2, 4);
--

INSERT INTO users (first_name, last_name, birthday, gender, height, weight, email, phone, campus, password, about, createdAt, ProfileImage) VALUES('s', 'c', '2016-07-18'::date, 'male', 180, 70, 'sc@gmail.com', '647-889-0094', 'St.George', 'sc@gmail.com', 'I Love Food', now(), './assets/images/DefaultProfilePic.jpg');

INSERT INTO Interests (userid, sportid) VALUES(2, 4);
INSERT INTO Interests (userid, sportid) VALUES(2, 6);
INSERT INTO Interests (userid, sportid) VALUES(2, 7);

INSERT INTO UnreadNotifications (userid, numfriendreqs, nummessages, numnotifications) VALUES(2, 3, 2, 4);
--


INSERT INTO users (first_name, last_name, birthday, gender, height, weight, email, phone, campus, password, about, createdAt, ProfileImage) VALUES('dan', 'oghabi', '2016-07-18'::date, 'female', 160, 70, 'pp@gmail.com', '647-889-0094', 'St.George', 'pp@gmail.com', 'I Love Food', now(), './assets/images/DefaultProfilePic.jpg');

INSERT INTO Interests (userid, sportid) VALUES(3, 4);
INSERT INTO Interests (userid, sportid) VALUES(3, 9);
INSERT INTO Interests (userid, sportid) VALUES(3, 11);

INSERT INTO UnreadNotifications (userid, numfriendreqs, nummessages, numnotifications) VALUES(3, 5, 5, 4);



--Friends with each other
INSERT INTO Friends (friend_one, friend_two, status) VALUES(1, 2, 1);
INSERT INTO Friends (friend_one, friend_two, status) VALUES(2, 1, 1);

INSERT INTO Friends (friend_one, friend_two, status) VALUES(1, 3, 1);
INSERT INTO Friends (friend_one, friend_two, status) VALUES(3, 1, 1);

--INSERT INTO Friends (friend_one, friend_two, status) VALUES(1, 4, 1);
--INSERT INTO Friends (friend_one, friend_two, status) VALUES(4, 1, 1);















