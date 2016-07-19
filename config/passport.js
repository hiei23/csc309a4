//var LocalStrategy = require('passport-local').Strategy;
var FackbookStrategy = require('passport-facebook').Strategy;

function FacebookUser(id,token,email,firstName,lastName){
	this.id = id;
	this.token = token;
	this.email = email;
	this.firstName = firstName;
	this.lastName = lastName;
}

var configAuth = require('./auth');

module.exports = function(passport){

	passport.serializeUser(function(user,done){
		done(null,user.id);
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
			//need to add database query here

			//if the user is found, then log them in and return that user

			//if not found, create a new user and return the new user
			var newUser = new FacebookUser();
			newUser.id = profile.id;
			newUser.token = token;
			newUser.firstName = profile._json.first_name;
			newUser.lastName = profile._json.last_name;
			newUser.email = profile._json.email;
			console.log(newUser);
			//save to database
			done(null,newUser);
		});	
	}));
}