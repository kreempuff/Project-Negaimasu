if (!process.env.NODE_ENV) {
  console.log("Development");
  require('dotenv').load();
}
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var uuid = require('uuid');
//defines mongoose
var mongoose = require('mongoose');
var passport = require('passport');

//define the models
require('./models/user');
require('./config/passport');
//connect to the server

var database = 'mongodb://localhost/nagaimasu';
mongoose.connect(database, function(err) {
  if (err) return console.log("Error connecting to database: %s", database);
  var time = new Date();
  console.log('Connected to database: %s at %s', database, time.toLocaleString());
});

var userRoutes = require('./routes/userRoutes');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
  layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());

//on homepage load, render the index page
app.get('/', function(req, res) {
  res.render('index');
});
app.get("/getuuid", function (req, res) {
  res.send({state: uuid()});
})

app.use('/api/user', userRoutes);

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Listening at http://localhost:' + port);
  console.log("Server started at %s", new Date().toLocaleString());
});
