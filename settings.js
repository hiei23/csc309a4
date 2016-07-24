/**
 * Configuration for the Postgres database in Heroku
 */

var user = 'wielrhuhgaumwo',
    database = 'dpnm78ei6assj',
    password = 'vS5efDv-xOGL5XxcckpMqR2pqT',
    port = 5432,
    host = 'ec2-54-225-244-221.compute-1.amazonaws.com';

/*
 * Extended String functionality to support place holders
 */
String.prototype.format = function()
{
    var content = this;
    for (var i=0; i < arguments.length; i++)
    {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};

exports.getDatabase = function()
{
    var URL = 'postgres://{0}:{1}@{2}:{3}/{4}';
    return URL.format(user, password, host, port, database);
};

