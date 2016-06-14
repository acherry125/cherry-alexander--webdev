var express = require('express');
var app = express();

// cookie parsing
var cookieParser = require('cookie-parser');
// session
var session = require('express-session');
var passport = require('passport');

app.use(cookieParser());
// change secret to session variable, and check out resave and saveUnitialized docs
app.use(session({ secret: 'thesecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// loading our assignment module
var assignment = require('./assignment/app.js');
// passing our module the express and request modules
assignment(app);

// loading project module
var project = require('./project/app.js');
// passing project module the express module
project(app);

require("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
