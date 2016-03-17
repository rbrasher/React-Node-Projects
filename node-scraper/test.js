var request = require("request");
var cheerio = require("cheerio");

request({
   uri: "https://play.google.com/store/apps/details?id=com.micro.cleaner",
}, function(error, response, body) {
    var $ = cheerio.load(body);
    $(".doc-review").each(function() {
        var review = $(this);

        console.log(review + "\n");
    });
});