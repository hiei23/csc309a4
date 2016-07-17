var pg = require('pg');

var conString = process.env.DATABASE_URL;

//PostgreSQL server can only handle 1 query at a time per conenction.


//Looks like you're calling dbClient.connect in each of those functions. You probably want to use the connection pool. Calling connect twice on the same client isn't going to work.

module.exports =
{
    

query:
    function(text, values, cb, res)
    {
        pg.connect(process.env.DATABASE_URL, function(err, client, done)
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
    
    
}