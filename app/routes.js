module.exports = function(app,passport){
	app.get('/auth/facebook',passport.authenticate('facebook'));
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook'),function(req,res){
			var user = req.user;
			if(!user){
				res.redirect('/login.html');
			}else{
				res.redirect('/Profile_SelfView.html');
				console.log(user);
			}
		});
}