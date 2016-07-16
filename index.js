var express = require('express');
var app = express();
//var pg = require('pg');

app.set('port', (process.env.PORT || 5000));


app.use(express.static(__dirname + '/front_end'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res)
        {
        res.sendfile(__dirname + '/front_end/index.html');
        }
        );


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

 

//app.get('/db', function (request, response) {
//        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//                   client.query(' SELECT * FROM Users;', function(err, result)
//
//                                {
//                                done();
//                                if (err)
//                                { console.error(err); response.send("Error " + err); }
//                                else
//                                { response.render('pages/db', {results: result.rows} ); }
//                                });
//                   });
//        });
//