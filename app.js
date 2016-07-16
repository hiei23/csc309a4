var express = require('express');
var pg = require('pg');

var app = express();

app.set('port', (process.env.PORT || 5000));



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/front_end'));

app.get('/', function (req, res)
                                {
                                     res.sendfile(__dirname + '/front_end/index.html');
                                }
        );



app.get('/db', function (request, response) {
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                   client.query('Set search_path to tsports;  SELECT * FROM Users;', function(err, result)
                                
                                {
                                done();
                                if (err)
                                { console.error(err); response.send("Error " + err); }
                                else
                                { response.render('pages/db', {results: result.rows} ); }
                                });
                   });
        });


app.listen(3000, function ()
                           {
                             console.log('Example app listening on port 3000!');
                           }
           );














//connection.end();
//lit-island-12585.herokuapp.com
////var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
////
////var client = new pg.Client(connectionString);
////client.connect();
////var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
////query.on('end', function() { client.end(); });

















