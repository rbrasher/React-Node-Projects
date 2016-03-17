/**
 * Created by Ron on 2/20/2015.
 */

//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var logger = require('morgan');
var mongoose = require('mongoose');
var router = express.Router();

//configure app
app.use(logger('dev'));             //log requests to the console

//configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set our port
var port = process.env.port || 9000;

//connect to our db
mongoose.connect('mongodb://localhost:27017/api_test');
var Bear = require('./models/bear');

//Middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening');
    next();
});

//Routes

//test route
router.get('/', function(req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/bears')
    .post(function(req, res) {
        //create a new instance of the Bear model
        var bear = new Bear();
        //set the bears name (comes from the request)
        console.log(req.body.name);
        bear.name = req.body.name;

        bear.save(function(err) {
            if(err)
                res.send(err);

            res.json({message: 'Bear created!'});
        });
    })

    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if(err)
                res.send(err);

            res.json(bears);
        });
    });

router.route('/bears/:bear_id')
    //get the bear with that id
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if(err) {
                res.send(err);
            }
            console.log(bear.name);
            res.json(bear);
        });
    })

    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if(err) {
                res.send(err);
            }

            bear.name = req.body.name;
            bear.save(function(err) {
                if(err) {
                    res.send(err);
                }

                res.json({message: 'Bear updated!'});
            });
        });
    })

    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if(err) {
                res.send(err);
            }

            res.json({message: 'Successfully deleted!'});
        });
    });

//Register our routes
app.use('/api', router);

//Start Server
app.listen(port);
console.log('Magic happens on port: ' + port);