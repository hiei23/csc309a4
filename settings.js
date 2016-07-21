/**
 * Configuration for the Postgres database in Heroku
 */

var user = 'tyvhgoqverwgjf',
    database = 'dbgvkt98mobtuk',
    password = 'LbL8CWzLwoh_LoQUoOMMP7iNCV',
    port = 5432,
    host = 'ec2-54-243-42-108.compute-1.amazonaws.com';

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

