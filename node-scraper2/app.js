/**
 * Module Dependencies
 */
var express = require('express')
    , jsdom = require('jsdom')
    , request = require('request')
    , url = require('url')
    , app = module.exports = express.createServer();
    
    
//Routes
app.get('/', function(req, res) {
    res.render('index', {
        title: "Express"
    });
});

app.get('/nodetube', function(req, res) {
    //Tell the request that we want to fetch youtube.com, send the results to:
    request({
        uri: 'http://youtube.com'
    }, function(err, response, body) {
        var self = this;
        self.items = new Array(); //save results in an array
        //basic err check
        if(err &&responseCode !== 200) {
            console.log('Request Error: ' + err + '\n');
        }
        
        //Send the body param as the HTML code we will parse in jsdom
        //also tell jsdom to attach jQuery in the scripts
        jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-1.6.min.js']
        }, function(err, window) {
           //use jQuery just as in any regular HTML page
           var $ = window.jQuery,
                $body = $('body'),
                $videos = $body.find('.video-entry');
                // .video-enrty elements contain the regular sized thumbnail for each one of the .video-entry elements found
                $videos.each(function(i, item) {
                    //use regular jQuery selectors
                    
                    //first anchor element which is child of our .video-entry item
                    var $a = $(item).children('a'),
                        //video title
                        $title = $(item).find('.video-title .video-long-title').text(),
                        //video duration time
                        $time = $a.find('.video-time').text(),
                        //thumbnail
                        $img = $a.find('span.clip img');
                        
                    //add all that data to my items array
                    self.items[i] = {
                        href: $a.attr('href'),
                        title: $title.trim(),
                        time: $time,
                        //there are some things with youtube video thumbnails, those images whose data-thumb attribute
                        //is defined use the url in the previously mentioned attribute as src for the thumbnail, othewise
                        //it will use the default served src attribute.
                        thumbnail: $img.attr('data-thumb') ? $img.attr('data-thumb') : $img.attr('src'),
                        urlObj: url.parse($a.attr('href'), true) //parse our url and the query string as well
                    };                   
                });
                //let's see what we've got
                console.log(self.items);
                res.end('Done');
        });
    })
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);