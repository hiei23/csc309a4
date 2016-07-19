var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
//module for fb authen
var passport = require('passport');

var Database = require('./modules/db'); //no need for .js


//set the port #
app.set('port', (process.env.PORT || 3000));  // 'postgres://tyvhgoqverwgjf:LbL8CWzLwoh_LoQUoOMMP7iNCV@ec2-54-243-42-108.compute-1.amazonaws.com:5432/dbgvkt98mobtuk'


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// required for passport
app.use(passport.initialize());
app.use(passport.session());

//Gets all the other files(htmls & css & js) for us, no need for app.get
app.use(express.static(__dirname + '/front_end'));


//Form Form Input Submissions
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true
}));

require('./config/passport')(passport);
//load routes for fb auth
require('./app/routes')(app,passport);

app.get('/', function (req, res){
  res.sendfile(__dirname + '/front_end/index.html');
});

 
//User Registration
//Insert info into the db
//app.post('/UserRegistration', function(req, res)
app.get('/db', function(req, res)
                             {
    
        for(var j = 2 ; j < 60; j++)
        {
//                                  var sql = 'INSERT INTO users(id) values ($1)';
//                                  Database.query(sql, [j], cb2, res );
//                                  console.log('ins');
        }
                                   //sql = 'SELECT * FROM users;';
                                  //Database.query(sql, [], cb, res );
        
        var sql = 'SELECT * FROM users where id = $1;';
        Database.query(sql, [58], cb, res );
        
        
                             }
         );


//User Registration
app.post('/UserRegistration', function(req, res){
  //req.body is a JS object
  console.log( req.body );

  var sql;

  //Server-Side Form Validation (Check if e-mail already exists)
  sql = 'SELECT * FROM users where email = $1;';
  Database.query(sql, [req.body.email], cb2, res );

  sql = 'INSERT INTO users (first_name, last_name, birthday, gender, height, weight, password, email, phone, createdAt, campus) ' +
             "VALUES($1, $2, $3::date, $4, $5, $6, $7, $8, $9, now(), $10);";

  Database.query(sql, [req.body.firstname, req.body.lastname, req.body.birthday, req.body.gender,
                       req.body.height, req.body.weight, req.body.password, req.body.email, req.body.phone, req.body.campus], cb, res );

});



function cb(err, result,res)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    else
    {
        //res.render('pages/db', {results: result.rows} );
        //console.log(result.rows[0].email);
        
    }
    
}

function cb2(err, result,res)
{
    if (err)
    {
        console.error(err);
        res.send("Error " + err);
    }
    else
    {
        //res.render('pages/db', {results: result.rows} );
        console.log('failed! email already theres');
        
    }
    
}






app.listen(app.get('port'), function()
                           {
                              console.log('Node app is running on port', app.get('port'));
                           }
          );











