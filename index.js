var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');   //File System - for file manipulation
var passport = require('passport'); //module for fb authen

var Database = require('./db'); //no need for .js


app.use(busboy());

//set the port #
app.set('port', (process.env.PORT || 3000));  // 'postgres://tyvhgoqverwgjf:LbL8CWzLwoh_LoQUoOMMP7iNCV@ec2-54-243-42-108.compute-1.amazonaws.com:5432/dbgvkt98mobtuk'

// required for passport
app.use(passport.initialize());
app.use(passport.session());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Gets all the other files(htmls & css & js) for us, no need for app.get
app.use(express.static(__dirname + '/front_end'));
app.use(cookieParser());

//Form Form Input Submissions
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
                               extended: true
                              })
       );


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/front_end/index.html');
});



/*****************************************USER REGISTRATION*****************************************************************/


//User Registration
app.post('/UserRegistration', function(req, res){
    //console.log( req.body );
         
    //Server-Side Form Validation (Check if e-mail already exists)
    var sql = 'SELECT * FROM users where email = $1;';
    Database.query(sql, [req.body.email], NewUserCB, res, req );
});



//Check if email already exists
function NewUserCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    
    //Row (Email) already exists
    //Send an error message to AJAX
    else if( result.rowCount == 1 )
    {
        //Send it to AJAX
        res.send( "emailexists" );
    }

    
    //Email doesn't exist
    //Insert user info in database
    else
    {
        //New User
        //insert in the DB
        var sql =   'INSERT INTO users (first_name, last_name, birthday, gender, height, weight, email, phone, campus, password, about, createdAt, ProfileImage) ' +
                    "VALUES($1, $2, $3::date, $4, $5, $6, $7, $8, $9, $10, $11, now(), './assets/images/DefaultProfilePic.jpg');";
        Database.query(sql, [req.body.firstname, req.body.lastname, req.body.birthday, req.body.gender, req.body.height, req.body.weight, req.body.email, req.body.phone, req.body.campus, req.body.password, req.body.aboutme ], GetUserIDCB, res, req );
    }
}


//Get the user's ID to enter it in the Interests table for sports preferences
function GetUserIDCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
        
    }
    else
    {
        var sql = 'SELECT id FROM users where email = $1;';
        Database.query(sql, [req.body.email], InsertUserSportPrefCB, res, req);
    }
}


function InsertUserSportPrefCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    else
    {
       // console.log(result.rows[0].id);
        //Get each sport submitted by form
        var SportsInterested=[];
        
        if(req.body.hasOwnProperty('cycling'))
        {
            SportsInterested.push(1); //The code for cycling
        }
        
        if(req.body.hasOwnProperty('waterpolo'))
        {
            SportsInterested.push(2); //The code for waterpolo
        }
        
        if(req.body.hasOwnProperty('squash'))
        {
            SportsInterested.push(3); //The code for squash
        }
        
        if(req.body.hasOwnProperty('boxing'))
        {
            SportsInterested.push(4); //The code for boxing
        }
        
        if(req.body.hasOwnProperty('taekwondo'))
        {
            SportsInterested.push(5); //The code for taekwondo
        }
        
        if(req.body.hasOwnProperty('basketball'))
        {
            SportsInterested.push(6); //The code for basketball
        }
        
        
        if(req.body.hasOwnProperty('tabletennis'))
        {
            SportsInterested.push(7); //The code for tabletennis
        }
        
        if(req.body.hasOwnProperty('tennis'))
        {
            SportsInterested.push(8); //The code for tennis
        }
        
        if(req.body.hasOwnProperty('volleyball'))
        {
            SportsInterested.push(9); //The code for volleyball
        }
        
        if(req.body.hasOwnProperty('football'))
        {
            SportsInterested.push(10); //The code for football
        }
        
        if(req.body.hasOwnProperty('swimming'))
        {
            SportsInterested.push(11); //The code for swimming
        }

        //Insert all the preferred sports
        for(var i=0; i<SportsInterested.length; i++)
        {
            
            var sql = 'INSERT INTO Interests (userid, sportid) ' + "VALUES($1, $2);";
            Database.query(sql, [result.rows[0].id, SportsInterested[i]], GenericCB, res, req );
        }
        
        //Insert data into the UnreadNotifications table for that userid
        //Initially numfriendreqs, nummessages, numnotifications are all zero
        var sql = 'INSERT INTO UnreadNotifications (userid, numfriendreqs, nummessages, numnotifications) ' + "VALUES($1, 0, 0, 0);";
        Database.query(sql, [result.rows[0].id], GenericCB, res, req );

        //Send it to AJAX
        res.send( "ok" );
    }
}


/*****************************************END USER REGISTRATION*****************************************************************/





/*****************************************USER LOGIN*****************************************************************/
//Website User Login
app.post('/WebSiteUserLogin', function(req, res){
    //console.log( req.body );
         
    //Server-Side Form Validation (Check if valid user login[email and password])
    var sql = 'SELECT * FROM users where (email = $1 and password = $2);';
    Database.query(sql, [req.body.email, req.body.password], UserLogin, res, req );
});


//Check if email already exists
function UserLogin(err, result,res, req)
{
    //The object to contain the ResponseText
    var TheObject = {};
    var JSON2Send = [];

    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    //Valid user login
    else if( result.rowCount == 1 )
    {
        console.log('Valid Login');
        
        //Send it to AJAX
        TheObject['ResponseText'] = 'ok';
        JSON2Send.push(TheObject); //The "ResponseText" is always the first object in JSON2Send
        
        //Attach a cookie to the HTTP header to be stored in the browser
        res.cookie( 'UserID' , result.rows[0].id);
        res.cookie( 'UserEmail' , req.body.email);
        res.cookie( 'UserPass' , req.body.password);

        res.setHeader('Access-Control-Allow-Origin', '*');
        //Send JSON File to AJAX
        res.end( JSON.stringify(JSON2Send) );
        
    }

    //Invalid Login info
    else
    {
        console.log('InValid Login');

        TheObject['ResponseText'] = 'invalidlogin';
        JSON2Send.push(TheObject);
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}

/*****************************************END USER LOGIN*****************************************************************/


/*****************************************FB LOGIN | REGISTRATION*****************************************************************/
require('./passport')(passport);


app.get('/auth/facebook',passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req,res){
    //Check if user already has an account with this email
    var sql = 'SELECT * FROM Users where (email = $1);';
    Database.query(sql, [req.user[0].email], FBLoginCB, res, req );
});


//Check if user already has an account with the email retrieved from FB, Don't use the FB ID
//If not, make an account
function FBLoginCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        //error go to home page
        res.redirect('/');
    }

    //Row (Account) exists
    //Redirect to their profile
    else if( result.rowCount == 1 )
    {
        //Logging in
        //Attach a cookie to the HTTP header to be stored in the browser
        res.cookie( 'UserID' , result.rows[0].id);
        res.cookie( 'UserEmail' , result.rows[0].email);
        res.cookie( 'UserPass' , result.rows[0].password);
        
        res.redirect('/Profile_SelfView.html');
    }

    //User didn't login with FB before
    //Insert user info (+ email) in db
    else
    {
        //insert in the DB and return the SERIAL EventID (This is concurrent safe)
        var sql = 'INSERT INTO users (first_name, last_name, gender, email, password, fbid, createdAt, ProfileImage) ' + "VALUES($1, $2, $3, $4, $5, $6, now(), './assets/images/DefaultProfilePic.jpg') RETURNING id;";
        //The password and fbid are the same
        Database.query(sql, [req.user[0].firstname, req.user[0].lastname, req.user[0].gender, req.user[0].email, req.user[0].fbid ,req.user[0].fbid], GoToHomePageCB, res, req );
    }
}


function GoToHomePageCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    else
    {
        //Insert data into the UnreadNotifications table for the new user
        //Initially numfriendreqs, nummessages, numnotifications are all zero
        var sql = 'INSERT INTO UnreadNotifications (userid, numfriendreqs, nummessages, numnotifications) ' + "VALUES($1, 0, 0, 0);";
        Database.query(sql, [result.rows[0].id], GenericCB, res, req );
        
        //Logging in
        //Attach a cookie to the HTTP header to be stored in the browser
        res.cookie( 'UserID' , result.rows[0].id);
        res.cookie( 'UserEmail' , req.user[0].email);
        res.cookie( 'UserPass' , req.user[0].fbid);
        
        //Redirect to their new profile
        res.redirect('/Profile_SelfView.html');
    }
    
}

/*****************************************FB LOGIN | REGISTRATION*****************************************************************/




/*****************************************Get Login User Info*****************************************************************/
app.get('/GetLoginUserInfo', function(req, res){
    //Get all the info that should be displayed when the user logs in:
    //Get the path of the user's profile picture in the server
    //Get the user's full name profile picture in the server
    //Get the UnreadNotifications (numfriendreqs, nummessages, numnotifications)
    var sql = "SELECT ProfileImage, first_name||' '||last_name AS username, numfriendreqs, nummessages, numnotifications  FROM (users CROSS JOIN UnreadNotifications) where (id = $1 and password = $2 and users.id = UnreadNotifications.userid);";
        
    //Use the cookies
    Database.query(sql, [req.cookies.UserID, req.cookies.UserPass], GetLoginUserInfoCB, res, req );
});



function GetLoginUserInfoCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    else
    {
        var JSON2Send = [];
        var Object = {};
        Object['ProfileImage'] = result.rows[0].profileimage;
        Object['username'] = result.rows[0].username;
        Object['numfriendreqs'] = result.rows[0].numfriendreqs;
        Object['nummessages'] = result.rows[0].nummessages;
        Object['numnotifications'] = result.rows[0].numnotifications;
        JSON2Send.push(Object);
        
        //res.setHeader('Access-Control-Allow-Origin', '*');
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}
/*****************************************END Get LoginUser Info*****************************************************************/




/*****************************************Get User's Friends | Event Users*****************************************************************/
//The user wants a list of his/her friends
app.get('/GetUserFriends', function(req, res){
    //Extract list of user's friends from the DB with all their info
    //Status = 1 to make sure friends were approved
    var sql = "SELECT friend_two, first_name||' '||last_name AS username, ProfileImage  FROM users CROSS JOIN Friends where (friend_one = $1 and id = friend_two and status = 1);";
    Database.query(sql, [req.cookies.UserID], GetUserFriends_EventUsersCB, res, req );
});

//The user wants a list of his/her friends
app.get('/GetDisplayedProfileUserFriends', function(req, res){
    //Extract list of user's friends from the DB with all their info
    //Status = 1 to make sure friends were approved
    var sql = "SELECT friend_two, first_name||' '||last_name AS username, ProfileImage  FROM users CROSS JOIN Friends where (friend_one = $1 and id = friend_two and status = 1);";
    Database.query(sql, [req.cookies.FriendIDClicked], GetUserFriends_EventUsersCB, res, req );
});

//Get all the users who are attending this event
app.post('/GetEventUsers', function(req, res) {
    //Get list of the users in the Event and all their info
    var sql = "SELECT users.id as friend_two, first_name||' '||last_name AS username, ProfileImage FROM (users CROSS JOIN EventUsers) where (EventUsers.userid = Users.id and EventUsers.id = $1);";
    Database.query(sql, [req.body.eventID], GetUserFriends_EventUsersCB, res, req );
});


function GetUserFriends_EventUsersCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    else
    {
        //JSON to send back containing all the user's friends info
        var JSON2Send = [];
        
        //Go through all the friends | (events)
        for(var i = 0; i < result.rows.length; i++)
        {
            //Add the object for the user's friend | (user in the event)
            var TheObject = {};
            TheObject['url'] = result.rows[i].profileimage;
            TheObject['name'] = result.rows[i].username;
            TheObject['friendid'] = result.rows[i].friend_two;
            JSON2Send.push(TheObject);
        }
        
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}

/*****************************************End Get User's Friends| Event Users*****************************************************************/



/*****************************************Get displayed profile Info*****************************************************************/
app.get('/GetDisplayedProfileInfo', function(req, res) {
    //Get all the info that should be displayed when a user visits someone elses profile:
    //Get the name and path of the profile picture in the server
        
    var sql = "SELECT ProfileImage, first_name||' '||last_name AS username  FROM users where id = $1;";
        
    //Use the "FriendIDClicked" cookies
    Database.query(sql, [req.cookies.FriendIDClicked], GetDisplayedProfileInfoCB, res, req );
});



function GetDisplayedProfileInfoCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    else
    {
//        res.clearCookie('FriendIDClicked'); //Clear the cookie
        var JSON2Send = [];
        var Object = {};
        Object['ProfileImage'] = result.rows[0].profileimage;
        Object['username'] = result.rows[0].username;
        JSON2Send.push(Object);
        
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}

/*****************************************END Get displayed profile Info*****************************************************************/


/*****************************************Upload Profile pic*****************************************************************/
app.post('/UploadProfilePic', function(req,res) {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        //console.log("Uploading: " + filename);
        //console.log('file type: ' + mimetype);

        //Only accept jpg files, if not jpg don't upload
        if (mimetype != 'image/jpg' && mimetype != 'image/jpeg')
        {
            file.resume();
        }

        else
        {
            //Path where image will be uploaded
            //For the file name use the user's unique ID (So if re-uplooad, it'll overwrite the image)
            var UploadedImagePath = '/front_end/assets/images/' + req.cookies.UserID + ".jpg";

            fstream = fs.createWriteStream(__dirname + UploadedImagePath);
            file.pipe(fstream);
            fstream.on('close', function () {
                //Update the path of the user's profile pic in the database
                var sql = "UPDATE users SET ProfileImage = $1 WHERE id = $2;";

                //Use the "UserID" cookies
                Database.query(sql, ['./assets/images/' + req.cookies.UserID + '.jpg', req.cookies.UserID], RefreshPageCB, res, req);
                //console.log("Upload Finished of " + filename);
            });
        }
    });
});


function RefreshPageCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    else
    {
        res.redirect('/Profile_SelfView.html');   //Refresh your profile page
    }
    
}
/*****************************************End Upload Profile pic*****************************************************************/


/*****************************************CREATE NEW EVENT*****************************************************************/
app.post('/CreateNewEvent', function(req, res) {
    //console.log( req.body );

    //First Find the sportid of this event
    var sql = 'SELECT sportid FROM Sports where (name = $1);';
    Database.query(sql, [req.body.EventType.toLowerCase()], GetSportIDCB, res, req );
});


//Find the sportid of this event
function GetSportIDCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    //Now insert this new event in the DB "Event"
    else
    {
        //console.log(result.rows[0].sportid);
    
        //Attendance is initially one (The admin)
        //Insert and return the SERIAL EventID (This is concurrent safe)
        var sql = 'INSERT INTO Event (name, location, numppl, attendance, DateTime, EndTime, Description, EventType, EventTypeID, EventAdminID) ' + "VALUES($1, $2, $3, 1, $4, $5, $6, $7, $8, $9) RETURNING Eventid;";
        Database.query(sql, [req.body.EventName, req.body.EventLocation, req.body.EventNumppl, req.body.EventDateTime, req.body.EventEndTime, req.body.EventDescription, req.body.EventType.toLowerCase(), result.rows[0].sportid, req.cookies.UserID], CreateEventCB, res, req );
    }
}


function CreateEventCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }

    //Now insert this user (The admin) as a person who is attending the event
    else
    {
        //Use the EventID SERIALized for this event by the server
        var sql = 'INSERT INTO EventUsers (id, userid) ' + "VALUES($1, $2);";
        Database.query(sql, [result.rows[0].eventid, req.cookies.UserID], EventCreatedCB, res, req );
    }
}



function EventCreatedCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }

    else
    {
        //Reload Self Profile Page
        //To show the calendar SVG with a tick sign
        res.redirect('/Profile_SelfView.html?EventSuccess=yes');
    }
    
}
/*****************************************END CREATE NEW EVENT*****************************************************************/



/*****************************************View Events*****************************************************************/
app.get('/ViewEvents', function(req, res) {
    
    var sql = "SELECT Eventid, name, EventType, to_char(DateTime, 'DD Mon YYYY HH:MI AM') AS EventDateTime, (EXTRACT(EPOCH FROM EndTime::Time - DateTime::Time)/3600)||' Hours' AS Duration, to_char(EndTime, 'HH:MI AM') AS EventEndTime, location, Description, numppl, (numppl - attendance) AS EventNumSpotsLeft, ProfileImage AS EventAdminPic, first_name||' '||last_name AS EventAdminName FROM (Event CROSS JOIN EventUsers CROSS JOIN Users) where (userid = $1 and EventUsers.id = Eventid and userid = Users.id and email = $2);";
                        
    //Use the cookies
    Database.query(sql, [req.cookies.UserID, req.cookies.UserEmail], SendUserEventsCB, res, req );
    
});


function SendUserEventsCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    //Send the Events as a JSON file
    else
    {
        //console.log(result.rows);
        var JSON2Send = [];
        
        //Go through all the Events
        for(var i = 0; i < result.rows.length; i++)
        {
            //Each object represents all the info needed for one event
            var TheObject = {};
            TheObject['EventName'] = result.rows[i].name;
            TheObject['EventType'] = result.rows[i].eventtype;
            TheObject['EventDateTime'] = result.rows[i].eventdatetime;
            TheObject['Duration'] = result.rows[i].duration;
            TheObject['EventEndTime'] = result.rows[i].eventendtime;
            TheObject['EventLocation'] = result.rows[i].location;
            TheObject['EventDescription'] = result.rows[i].description;
            TheObject['EventNumPpl'] = result.rows[i].numppl;
            TheObject['EventNumSpotsLeft'] = result.rows[i].eventnumspotsleft;
            TheObject['EventID'] = result.rows[i].eventid;
            TheObject['EventAdminPic'] = result.rows[i].eventadminpic;
            TheObject['EventAdminName'] = result.rows[i].eventadminname;
            
            JSON2Send.push(TheObject);
        }
        
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}

/*****************************************END View Events*****************************************************************/


/*****************************************Leave Event*****************************************************************/
app.post('/LeaveEvent', function(req, res) {
    //Sent by AJAX as a JSON File
    //console.log(req.body.eventID);
                        
    //Check if this user(who is leaving) was the admin of the event
    var sql = "SELECT * FROM Event where (Eventid = $1 and EventAdminID=$2);";
    Database.query(sql, [req.body.eventID, req.cookies.UserID], IsAdminLeaveEventCB, res, req );
});



//If an admin leaves his own event, the whole event is cancelled
function IsAdminLeaveEventCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    //User who is leaving the event is the admin
    else if(result.rowCount == 1)
    {
        
        //Remove the whole event from Table "Event"
        //Changes are propagated by "On Delete Cascade"
        var sql = "DELETE FROM Event where (Eventid = $1 and EventAdminID = $2);";
        Database.query(sql, [req.body.eventID, req.cookies.UserID], GenericCB, res, req );
        
        //Tell AJAX to pop up an alert box
        res.send( "UserWasAdmin" );
    }
    
    //User who is leaving is not the admin
    else
    {
        //Remove the user from Table "EventUsers"
        var sql = "DELETE FROM EventUsers where (id = $1 and userid = $2);";
        Database.query(sql, [req.body.eventID, req.cookies.UserID], GenericCB, res, req );
        
        //Decrease the attendance by 1
        var sql = "UPDATE Event SET attendance = (attendance-1) where eventid = $1;";
        Database.query(sql, [req.body.eventID], GenericCB, res, req );
        
        res.send( "" );
    }
    
}
/*****************************************END Leave Event*****************************************************************/



/*****************************************GetEventMessages*****************************************************************/
app.post('/GetEventMessages', function(req, res) {
    //Get all the messages in the group chat for that event
    var sql = "SELECT sentById, ProfileImage, chatmessage FROM (EventGroupChat CROSS JOIN users) where (sentById = Users.id and eventid = $1) order by MessageTime ASC;";
    Database.query(sql, [req.body.eventID], GetEventMessagesCB, res, req );
});


function GetEventMessagesCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    else
    {
        
        //JSON to send back containing the event messages
        var JSON2Send = [];
        
        //Go through all messages
        for(var i = 0; i < result.rows.length; i++)
        {
            var TheObject = {};
            TheObject['sentById'] = result.rows[i].sentbyid;
            TheObject['ProfileImage'] = result.rows[i].profileimage;
            TheObject['chatmessage'] = result.rows[i].chatmessage;
            JSON2Send.push(TheObject);
        }
        
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}
/*****************************************END GetEventMessages*****************************************************************/




/*****************************************GetAboutUserInfo*****************************************************************/
app.get('/GetUserAboutInfo', function(req, res) {
    //Get all the info that should be displayed when the user logs in:
    //Get the path of the user's profile picture in the server
    //Get the user's full name profile picture in the server
    //Get the UnreadNotifications (numfriendreqs, nummessages, numnotifications)
    var sql = "SELECT campus, first_name, last_name, phone, email, to_char(birthday, 'DD Mon YYYY') AS Birthday, height, weight, gender, about, Sports.name  FROM (users CROSS JOIN Interests CROSS JOIN Sports) where (Interests.sportid = Sports.sportid and id=$1 and password=$2 and id = Interests.userid);";
                            
    //Use the cookies
    Database.query(sql, [req.cookies.UserID, req.cookies.UserPass], GetUserAboutInfoCB, res, req );
});


function GetUserAboutInfoCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    else
    {
        console.log(result.rowCount);
        console.log(result.rows);
        var JSON2Send = [];
        
        var Object = {};
        Object['Campus'] = result.rows[0].campus;
        Object['Given_Name'] = result.rows[0].first_name;
        Object['Family_Name'] = result.rows[0].last_name;
        Object['Phone_number'] = result.rows[0].phone;
        Object['Email_Address'] = result.rows[0].email;
        Object['Birthday'] = result.rows[0].birthday;
        Object['Height'] = result.rows[0].height;
        Object['Weight'] = result.rows[0].weight;
        Object['Gender'] = result.rows[0].gender;
        Object['About_Me'] = result.rows[0].about;

        //List of user's sports interest they chose
        var SportsInterested = [];
       
        //Go through all Interested Sports
        for(var i = 0; i < result.rows.length; i++)
        {
            SportsInterested.push(result.rows[i].name);
        }
        
        Object['SportsInterested'] = SportsInterested;
        JSON2Send.push(Object);

        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}
/*****************************************END GetAboutUserInfo*****************************************************************/



/*****************************************UpdateAboutUserInfo*****************************************************************/
//app.post('/UpdateAboutUserInfo', function(req, res)
//        {
//        //Get all the messages in the group chat for that event
//        var sql = "SELECT sentById, ProfileImage, chatmessage FROM (EventGroupChat CROSS JOIN users) where (sentById = Users.id and eventid = $1) order by MessageTime ASC;";
//        Database.query(sql, [req.body.eventID], GetEventMessagesCB, res, req );
//        }
//        );
//
//
//function GetEventMessagesCB(err, result,res, req)
//{
//    if (err)
//    {
//        console.error(err);
//        res.send("Error " + err);
//    }
//    
//    else
//    {
//        
//        //JSON to send back containing the event messages
//        var JSON2Send = [];
//        
//        //Go through all messages
//        for(var i = 0; i < result.rows.length; i++)
//        {
//            var TheObject = {};
//            TheObject['sentById'] = result.rows[i].sentbyid;
//            TheObject['ProfileImage'] = result.rows[i].profileimage;
//            TheObject['chatmessage'] = result.rows[i].chatmessage;
//            JSON2Send.push(TheObject);
//            
//        }
//        
//        //Send it to AJAX
//        res.end( JSON.stringify(JSON2Send) );
//        
//    }
//}
/*****************************************END UpdateAboutUserInfo*****************************************************************/



/*****************************************SearchEventsByClick*****************************************************************/
//User is searching for events
//Send back data to show preview of events matching their search
app.post('/SearchEventsByClick', function(req, res) {
         
    //Select all events that match the sport selected and that ((numppl - attendance) > 0) [the event has open spots]
    //And subtract it from events in which you are already joined in
    var sql = "(SELECT Eventid, name, EventType, to_char(DateTime, 'DD Mon YYYY HH:MI AM') AS EventDateTime, numppl, (numppl - attendance) AS EventNumSpotsLeft FROM Event where (EventType = $1 and ((numppl - attendance) > 0))) EXCEPT (SELECT Eventid, name, EventType, to_char(DateTime, 'DD Mon YYYY HH:MI AM') AS EventDateTime, numppl, (numppl - attendance) AS EventNumSpotsLeft FROM (Event CROSS JOIN EventUsers CROSS JOIN Users) where (userid = $2 and EventUsers.id = Eventid and userid = Users.id) );";

    Database.query(sql, [req.body.EventSportClicked, req.cookies.UserID], GetEventsSelectedSportSearchCB, res, req );
});


function GetEventsSelectedSportSearchCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    
    else
    {
        console.log(result.rows);
        var JSON2Send = [];

        //Go through all the Events
        for(var i = 0; i < result.rows.length; i++)
        {
            //Each object represents all the info needed for one event
            var TheObject = {};
            TheObject['EventName'] = result.rows[i].name;
            TheObject['EventID'] = result.rows[i].eventid;
            TheObject['EventType'] = result.rows[i].eventtype;
            TheObject['EventDateTime'] = result.rows[i].eventdatetime;
            TheObject['EventNumPpl'] = result.rows[i].numppl;
            TheObject['EventNumSpotsLeft'] = result.rows[i].eventnumspotsleft;

            JSON2Send.push(TheObject);
        }
        
        //Send it to AJAX
        res.end( JSON.stringify(JSON2Send) );
    }
}
/*****************************************END SearchEventsByClick*****************************************************************/












//app.get('/ViewEvents', function(req, res)
//        {
//        
//        var sql = "SELECT Eventid, name, EventType, to_char(DateTime, 'DD Mon YYYY HH:MI AM') AS EventDateTime, (EXTRACT(EPOCH FROM EndTime::Time - DateTime::Time)/3600)||' Hours' AS Duration, to_char(EndTime, 'HH:MI AM') AS EventEndTime, location, Description, numppl, (numppl - attendance) AS EventNumSpotsLeft, ProfileImage AS EventAdminPic, first_name||' '||last_name AS EventAdminName FROM (Event CROSS JOIN EventUsers CROSS JOIN Users) where (userid = $1 and EventUsers.id = Eventid and userid = Users.id and email = $2);";
//        
//        //Use the cookies
//        Database.query(sql, [req.cookies.UserID, req.cookies.UserEmail], SendUserEventsCB, res, req );
//        
//        }
//        );
//
//
//function SendUserEventsCB(err, result,res, req)
//{
//    
//    if (err)
//    {
//        console.error(err);
//        res.send("Error " + err);
//    }
//    
//    //Send the Events as a JSON file
//    else
//    {
//        //console.log(result.rows);
//        
//        var JSON2Send = [];
//        
//        //Go through all the Events
//        for(var i = 0; i < result.rows.length; i++)
//        {
//            
//            //Each object represents all the info needed for one event
//            var TheObject = {};
//            TheObject['EventName'] = result.rows[i].name; -------------------------
//            TheObject['EventType'] = result.rows[i].eventtype; -------------------------
//            TheObject['EventDateTime'] = result.rows[i].eventdatetime; ---------------------
//            TheObject['Duration'] = result.rows[i].duration;
//            TheObject['EventEndTime'] = result.rows[i].eventendtime;
//            TheObject['EventLocation'] = result.rows[i].location;
//            TheObject['EventDescription'] = result.rows[i].description;
//            TheObject['EventNumPpl'] = result.rows[i].numppl; ------------------------
//            TheObject['EventNumSpotsLeft'] = result.rows[i].eventnumspotsleft; ------------------
//            TheObject['EventID'] = result.rows[i].eventid;
//            TheObject['EventAdminPic'] = result.rows[i].eventadminpic;
//            TheObject['EventAdminName'] = result.rows[i].eventadminname;
//            
//            JSON2Send.push(TheObject);
//        }
//        
//        //Send it to AJAX
//        res.end( JSON.stringify(JSON2Send) );
//        
//    }
//}

















/*************************************************************************************************************/

//Sign out
app.get('/SignOut', function(req,res)
{
        //clear all the cookies
        res.clearCookie('UserID');
        res.clearCookie('UserEmail');
        res.clearCookie('UserPass');
        
        //AJAX will go to the homepage
        res.send("Signed Out");
});


//This callback function does nothing
//Only used for modifying/inserting in the DB
//Used as a placeholder
function GenericCB(err, result,res, req)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    else
    {
       //Success
       //Do nothing
    }
    
}


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

























/****************************************TEMP*****************************************************************/
//                                 var sql = 'SELECT friend_two FROM friends where (friend_one = $1 and status = 1);'; //Status = 1 to make sure friends were approved
//                                 Database.query(sql, [req.cookies.UserID], GetUserFriendsCB, res, req );

//        pg.connect(process.env.DATABASE_URL, function(err, client, done)
//                                           {
//                                               if (err) { return console.error(err); }
//
//                                               var condition = true;
//                                               async.waterfall([
//                                                                function(callback)
//                                                                {
//                                                                    var sql = 'SELECT friend_two FROM friends where (friend_one = $1 and status = 1);'; //Status = 1 to make sure friends were approved
//                                                                   //client.query(sql, [req.cookies.UserID], GetUserFriendsCB, res, req );
//
//                                                                console.log("Cookies Check based: " + req.cookies.UserPass );
//                                                                client.query(sql, [req.cookies.UserID], function(err, result)
//                                                                                                         {
//                                                                                                            if(err){callback(err,null); return;}
//                                                                                         console.log("Step 1: " + result.rows.length);
//
//
//                                                                                         callback(null, result, "arg2");//Calls the next function
//
//                                                                                                         }
//
//                                                                             );
//
//
//                                                                }
//                                                                ,
//
//                                                                function(result1,arg2, callback)
//                                                                {
//
//                                                                console.log('passed into function2!: ' + arg2);
//                                                                //JSON to send back containing all the user's friends info
//                                                                var JSON2Send = [];
//
//                                                                //Go through all the friends
////                                                                for(var i = 0; i < result1.rows.length; i++)
////                                                                {
//                                                                //For each friend, get their profilepic, name, and their userID
//                                                                var sql = "SELECT profileimage, first_name||' '||last_name AS username, id  FROM users WHERE (id = $1);";
//
//                                                                client.query(sql, [result1.rows[0].friend_two], function(err, result)
//                                                                                                                 {
//                                                                                                                    if(err){callback(err,null); return;}
//                                                                                                                    console.log("Step 2: " + result.rows.length);
//
//
//
//                                                                                                                    //Calls the next function
//                                                                                                                 var TheObject = {};
//                                                                                                                 TheObject['url'] = result.rows[0].profileimage;
//                                                                                                                 TheObject['name'] = result.rows[0].username;
//                                                                                                                 TheObject['friendid'] = result.rows[0].id;
//                                                                                                                 JSON2Send.push(TheObject);
//
//
//                                                                                                                  callback(null, JSON2Send);//Calls the next function
//                                                                                                                 }
//                                                                             );
//
//
////                                                                }
//
////                                                                callback(null, JSON2Send);//Calls the next function
//
//                                                                }
//                                                                //,
//
//
//
//
//
////                                                                console.log("Results: " + JSON2Send);
////                                                                var sql = 'SELECT friend_two FROM friends where (friend_one = $1 and status = 1);'; //Status = 1 to make sure friends were approved
////                                                                client.query(sql, [req.cookies.UserID], GetUserFriendsCB, res, req );
////
////                                                                client.query(text, values, function(err, result)
////                                                                             {
////                                                                             done();
////                                                                             cb(err, result, res, req);
////                                                                             }
////                                                                             );
////
//
////                                                                }
////                                                                ,
////
////
////                                                                 PushSQL,
////                                                                 function (next)
////                                                                 {
////                                                                     if (condition)
////                                                                     {
////                                                                        UpdateTable(id, name, next);
////                                                                     }
////                                                                     else
////                                                                     {
////                                                                        next();
////                                                                     }
////                                                                 }
//                                                             ],
//                                                                function(err, JSON2Send)
//                                                                {
//                                                               if (err) { console.error(err); return; }
//                                                               console.log("Final: JSON: " + JSON2Send);
//                                                               client.end();
//                                                                    pg.end();
//                                                                }
//                                                            );
//
//
//                                               function CreateExtensions(callback)
//                                              {
//                                               var queryConfig = 'CREATE EXTENSION postgis; CREATE EXTENSION hstore;';
//                                               client.query(queryConfig, function(err) {
//                                                            return callback(err);
//                                                            });
//                                               }
//
//                                               function PushSQL(callback)
//                                               {
//                                               var queryConfig = fs.readFileSync("./database/cmdb.sql", 'utf8');
//                                               client.query(queryConfig, function(err) {
//                                                            return callback(err);
//                                                            });
//                                               }
//
//                                               function UpdateTable(id, name, callback)
//                                               {
//                                               var queryConfig = "UPDATE table SET name = '" + name + "' WHERE id = " + id + ";";
//                                               client.query(queryConfig, function(err) {
//                                                            condition = false;
//                                                            return callback(err);
//                                                            });
//                                               }
//                                           });

//*********************************






