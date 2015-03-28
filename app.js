var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var boards = require('./routes/board');
var members = require('./routes/member');
var search = require('./routes/search');
var community = require('./routes/community');
var message = require('./routes/message');
var course = require('./routes/course');


var client = redis.createClient();
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
//    dest:'./uploads',
//    rename: function(fieldname,filename){
//        return filename;
//        // return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
//    }
}));
//그냥 세션
//app.use(session({
//    secret: 'HeLLo TuTor',
//    resave: false,
//    saveUninitialized: true
//}));
app.use(session(
    {
        secret: 'yourothersecretcode',
        store: new redisStore({ host: "127.0.0.1", port: 6379, client: client }),
        saveUninitialized: false, // don't create session until something stored,
        resave: false // don't save session if unmodified
    }
));

app.use('/', routes);
app.use('/users', users);
app.use('/board', boards);
app.use('/member', members);
app.use('/search', search);
app.use('/community', community);
app.use('/message', message);
app.use('/course', course);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



var router = express.Router();


// production error handler
router.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully');
});

app.get('/session/get/', function(req, res) {
    if(req.session.redSession)
        res.send('the session value stored in Redis is: ' + req.session.redSess);
    else
        res.send("no session value stored in Redis ");
});


// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//var server = app.listen(80,function(){
//    console.log('HelloTutor started in port '+ server.address().port);
//})
var http = require('http');
var https = require('https');
var fs = require('fs');

var options = {
    key : fs.readFileSync('./key.pem','utf8'),
    cert : fs.readFileSync('./server.crt','utf8')
}

var http_port = 80;
var https_port = 443;

http.createServer(app).listen(http_port,function(){
    console.log('server started by http');
})

https.createServer(options,app).listen(https_port,function(){
    console.log('server started by https');
})

module.exports = app;
