var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var passport = require("passport");

var welcomeRouter = require('./routes/welcome');
var userRouter = require('./routes/users');
var config = require("./config");

const http = require('http');
const WebSocket = require('ws');
const Game = require('./game');

var app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const rummy = new Game(wss);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

//serve static files from frontend, if they exist
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//connect to database
console.log("Connecting to db");
const url = process.env.MONGODB_URI || config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then(
  db => {
    console.log("Connect correctly to the server");
  },
  error => {
    console.log(error);
  }
);

//API paths on the server
app.use('/welcome', welcomeRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Serve Static Files/Assets
app.use(express.static('public'));

// Ignore Socket Errors
wss.on('error', () => console.log('*errored*'));
wss.on('close', () => console.log('*disconnected*'));

/*----------------------ENDPOINTS----------------------*/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/join/:lobby', (req, res) => {
  let code = req.params.lobby;
  if (rummy.addLobby(code)) {
    res.redirect('/game/' + req.params.lobby + '/' + rummy.lobbies[code].token);
  } else {
    res.redirect('/');
  }
});

app.get('/game/:lobby/:token', (req, res) => {
  let code = "" + req.params.lobby,
      token = req.params.token;
  if (req.params.token && rummy.lobbies[code] && rummy.lobbies[code].token == token) {
    res.sendFile(__dirname + '/public/game.html');
  } else {
    res.redirect('/');
  }
});
/*-----------------------------------------------------*/

// Start Server
server.listen(5000, () => {
  console.log('Listening on port 5000...')
});

module.exports = app;
