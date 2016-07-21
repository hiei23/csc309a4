var pg = require('pg');
var settings = require('../settings');

var connectionString = process.env.DATABASE_URL || settings.getDatabase();
//PostgreSQL server can only handle 1 query at a time per conenction so use pg.connect
module.exports =
{
    query:
        //text is the SQL Query
        //values is for prepared statements
        //cb is a callback function we pass in to do what we want with the query result
        //res is the HTTP response variable
        function(text, values, cb, res)
        {
            pg.connect(connectionString, function(err, client, done)
                                                 {
                                                    client.query(text, values, function(err, result)
                                                                                {
                                                                                    done();
                                                                                    cb(err, result, res);
                                                                                }
                                                                 );
                                                 }
                      );
        }
};


