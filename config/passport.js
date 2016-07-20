//var LocalStrategy = require('passport-local').Strategy;
var FackbookStrategy = require('passport-facebook').Strategy;
var pg = require('pg');
pg.defaults.ssl = true;

function FacebookUser(id,email,firstName,lastName,gender){
	this.id = id;
	this.email = email;
	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = gender;
}

var configAuth = require('./auth');

var connectionString = process.env.DATABASE_URL || 'postgres://tyvhgoqverwgjf:LbL8CWzLwoh_LoQUoOMMP7iNCV@ec2-54-243-42-108.compute-1.amazonaws.com:5432/dbgvkt98mobtuk';
var searchString = "SELECT * FROM tsports.users WHERE fbID = $1;";
var insertString = "INSERT INTO tsports.users (first_name,last_name,fbID,email,gender,password) VALUES ($1,$2,$3,$4,$5,$6);"

var newUser = new FacebookUser();

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});
	passport.use(new FackbookStrategy({
		clientID:configAuth.fackbookAuth.clientID,
		clientSecret:configAuth.fackbookAuth.clientSecret,
		callbackURL:configAuth.fackbookAuth.callbackURL,
		profileFields: ['id', 'email', 'gender', 'name']
	},
	//facebook will send back the token and profile
	function(token,refreshToken,profile,done){
		//asynchronous
		process.nextTick(function(){
			//find the user in the database based on their facebook id
			pg.connect(connectionString,function(err,client,doneDB){
				if(err){
					//if there is an error connecting to database, stop everything and return that
					return done(err);
				}
				var query = client.query(searchString,[profile.id],function(err,result){
					if(result.rows.length == 0){
						//if not found, create a new user and return the new user
						newUser.id = profile.id;
						newUser.firstName = profile._json.first_name;
						newUser.lastName = profile._json.last_name;
						newUser.email = profile._json.email;
						newUser.gender = profile._json.gender;
						client.query(insertString,[newUser.firstName,newUser.lastName,newUser.id,newUser.email,newUser.gender,'111111']);							
					}else{
						//if the user is found, then log them in and return that user
						newUser.id = result.rows[0].fbid;
						newUser.firstName = result.rows[0].first_name;
						newUser.lastName = result.rows[0].last_name;
						newUser.email = result.rows[0].email;
						newUser.gender = result.rows[0].gender;
					}	
				});
				query.on('end',function(){
					doneDB();
					return done(null,newUser);
				});
			});
		});
	}));
}



