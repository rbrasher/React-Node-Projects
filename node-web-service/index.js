/**
 * Created by Ron on 2/23/2015.
 */

//Dependencies
var express = require('express');

var app = module.exports = express();

//create an error with .status
//we can then use the property in our
//custom error handler (Connect respects this prop as well)

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

//here we vaildate the API key,
//by mounting this middleware to /api
//meaning only paths prefixed with "/api"
//will cause middleware to be invoked

app.use('/api', function(req, res, next) {
    var key = req.query['api-key'];
    console.log(key);

    //key isn't present
    if(!key)
        return next(error(400, 'API Key required'));

    //key is valid
    if(!~apiKeys.indexOf(key))
        return next(error(401, 'Invalid API Key'));

    //all good, store req.key for route access
    req.key = key;
    next();
});

//map of valid api keys, typically mapped to account info
//with some sort of database. Api keys do_not_serve as
//authentication, merely to track API usage or help
//prevent malicious behavior
var apiKeys = ['foo', 'bar', 'baz'];

//these two objects will serve as our faux database

var repos = [
    { name: 'express', url: 'http://github.com/strongloop/express' }
    , { name: 'stylus', url: 'http://github.com/learnboost/stylus' }
    , { name: 'cluster', url: 'http://github.com/learnboost/cluster' }
];

var users = [
    {name: 'ron'},
    {name: 'test'},
    {name: 'admin'}
];

var userRepos = {
    ron: [repos[0], repos[1]],
    test: [repos[1]],
    admin: [repos[0], repos[1], repos[2]]
};

//we can now assume the api key is valid,
//and simply expose the data
app.get('/api/users', function(req, res, next) {
    res.send(users);
});

app.get('/api/repos', function(req, res, next) {
    res.send(repos);
});

app.get('/api/user/:name/repos', function(req, res, next) {
    var name = req.params.name;
    var user = userRepos[name];

    if(user)
        res.send(user);
    else
        next();
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next) {
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    res.status(err.status || 500);
    res.send({error: err.message});
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res) {
    res.status(404);
    res.send({error: 'Lame, can\'t find that'});
});

if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}