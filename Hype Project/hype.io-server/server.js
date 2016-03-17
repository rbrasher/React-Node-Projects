/**
 * Created by Ron on 2/20/2015.
 */

//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.port || 9000;
var router = express.Router();
var Firebase = require('firebase');

//var FirebaseLoginEmail = require('firebase-login-email');

var app = express();

//log requests to the console while in dev mode
app.use(logger('dev'));

//configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database stuff here
var myFirebaseRef = new Firebase("https://hype-io.firebaseio.com");

//create an error with .status. We can then use
//the property in our custom error handler
function error(status, msg) {
    var err = new Error(msg);
    err.status = status;//test
    return err;
}

//middleware to use for all requests

router.use(function(req, res, next) {
    //do logging
    next();
});

//Routes

//Projects
router.get('/projects', function(req, res, next) {
    //will probably need to rewrite this as it has/will change
    myFirebaseRef.child("mharward/projects").on("value", function(snapshot) {
        console.log(snapshot.val());

        res.send(snapshot.val());
        next();
    }, function(err) {
        console.log(err);
        next();
    });
});

router.post('/project', function(req, res, next) {
    var project = req.params.project;
    project.ID = crypto.randomBytes(20).toString('hex');

    if(typeof project.name == 'undefined') {
        res.send(400, {error: 'Missing project name'});
        next();
    } else if(typeof project.author == 'undefined') {
        res.send(400, {error: 'Missing project author'});
        next();
    } else {
        //add code to insert project here

        //make a reference to a child of the firebase reference
        var projectRef = myFirebaseRef.child("project");

        projectRef.set({project: project}, function(err, data) {
            if(err) {
                console.log(err);
                next();
            } else {
                console.log(data);
                next();
            }
        });

    }
});

router.put('/project/:id', function(req, res, next) {
    var project = req.params.post;

    if(typeof project.name == 'undefined') {
        res.send(400, {error: 'Missing project name'});
        next();
    } else if(typeof project.author == 'undefined') {
        res.send(400, {error: 'Missing project author'});
        next();
    } else {
        console.log('Info Match: ' + req.params.match[1]);
        var ID = req.params.match[1];

        //add firebase update code here

        next();
    }
});

router.delete('/project/:id', function(req, res, next) {
    var ID = req.params.match[1];
    console.log('router.del project ID: ' + ID);

    //add firebase code to delete project here
    next();
});


//Users
router.get('/users', function(req, res, next) {
    myFirebaseRef.child("users").on("value", function(snapshot) {
        console.log(snapshot.val());

        res.send(snapshot.val());
        next();
    });
});

router.post('/user', function(req, res, next) {
    var user = req.params.post;
    user.ID = crypto.randomBytes(20).toString('hex');

    if(typeof user.name == 'undefined') {
        res.send(400, {error: 'Missing project name'});
        next();
    } else {
        //add code to insert user here

        next();
    }
});

router.put('/user/:id', function(req, res, next) {
    var user = req.params.post;

    if(typeof user.name == 'undefined') {
        res.send(400, {error: 'Missing project name'});
        next();
    } else {
        console.log('Info Match: ' + req.params.match[1]);
        var ID = req.params.match[1];

        //add firebase update code here

        next();
    }
});

router.delete('/user/:id', function(req, res, next) {
    var ID = req.params.match[1];
    console.log('router.del project ID: ' + ID);

    //add firebase code to delete user here

    next();
});

//Messages
router.get('/messages', function(req, res, next) {
    myFirebaseRef.child("messages").on("value", function(snapshot) {
        console.log(snapshot.val());

        res.send(snapshot.val());

        next();
    });
});


//Examples
router.get('/examples', function(req, res, next) {
    var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");

    //attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        console.log(snapshot.val());
        res.send(snapshot.val());
        next();
    }, function(err) {
        console.log("the read failed: " + err.code);
    });
});

router.post('/examples', function(req, res, next) {
    var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");

    var usersRef = ref.child("users");

    usersRef.set({
       alanisawesome: {
           title: req.params.title
       },
        gracehop: {
            title: req.params.title
        }
    }, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(res.code);
        }
    });

});

//test route
router.get('/', function(req, res) {
    var html = '';

    html += '<h4>Welcome to the Hype.io API Server</h4><br /><br/>';
    html += 'Available methods:<br />';
    html += '<ul>';
    html += '<li>GET /projects</li>';
    html += '<li>POST /project</li>';
    html += '<li>PUT /project/:id</li>';
    html += '<li>DELETE /project/:id</li>';
    html += '</ul><br /><br /><hr>';

    html += '<ul>';
    html += '<li>GET /users</li>';
    html += '<li>POST /user</li>';
    html += '<li>PUT /user/:id</li>';
    html += '<li>DELETE /user/:id</li>';
    html += '</ul><br /><br /><hr>';

    html += '<ul>';
    html += '<li>GET /messages</li>';
    //html += '<li>POST /message</li>';
    //html += '<li>PUT /message/:id</li>';
    //html += '<li>DELETE /message/:id</li>';
    html += '</ul><br /><br /><hr>'

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
});

//Register our routes
app.use('/api', router);

//start the server
app.listen(port);
console.log('API Server is Listening on 127.0.0.1:' + port);


/**
 * This Login route is not used. Keep as an example for future reference
 */
/*
 router.post('/user/login/simple', function(req, res, next) {
 var email = req.body.email;
 var password = req.body.password;

 console.log('email: ' + email + '  password: ' + password);

 FirebaseLoginEmail(myFirebaseRef, {
 email: email,
 password: password
 }, function(err, data) {
 console.log(err);
 if(err) {
 res.send(err);
 } else {
 console.log(data.token);
 res.send(data.token);
 }
 });
 });
 */