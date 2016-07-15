var express = require("express");

var port = 8080;
var app = express();

var getClientAddress = function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};

app.use('/api/whoami', function(req, res){
    var ip = getClientAddress(req);
    var language = req.headers['accept-language'].split(',')[0];
    var os = req.headers['user-agent'].substring(req.headers['user-agent'].indexOf('(')+1,req.headers['user-agent'].indexOf(')'));
    var resObj = {
        ipAddress: ip,
        language: language,
        software: os
    };
    res.end(JSON.stringify(resObj));
});

app.use('/', function(req, res){
    res.redirect('/api/whoami')
})


app.listen(port, function(){
    console.log("listening on port 8080..")
});