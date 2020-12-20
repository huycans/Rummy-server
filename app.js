var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var passport = require("passport");
var https = require('https');
var http = require('http');
var fs = require('fs');
var helmet = require("helmet");

const WebSocket = require('ws');
const Game = require('./game');


var userRouter = require('./routes/users');
var cors = require("./routes/cors");

var config = require("./config");
var { verifyUser } = require("./authenticate");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//initialize passport
app.use(passport.initialize());


//use helmet to protect again common vulnerabilities
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "default-src": ["'self'"],
      "script-src": ["'self'", "http://localhost:3000"],
      "object-src": ["'none'"],  
      "style-src": ["'self'"],
    },
  })
);

//connect to database
console.log("Connecting to db");
const url = process.env.MONGODB_URI || config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then(
  db => {
    console.log("Connect correctly to database");
  },
  error => {
    console.log(error);
  }
);

//https server
var httpServer = http.createServer(app);

//establish websocket
const wss = new WebSocket.Server({ server: httpServer });
const rummy = new Game(wss);

// Ignore Socket Errors
wss.on('error', () => console.log('*errored*'));
wss.on('close', () => console.log('*disconnected*'));

//API paths on the server
app.use('/user', userRouter);

let lobbycodeRegex = /^[a-zA-Z0-9]{5,12}$/;

//path to game
app
  .route("/join/:lobby")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(verifyUser, (req, res) => {
    let lobbycode = decodeURIComponent(req.params.lobby);
    //make sure lobby code is alphanumerics only, then add
    if (lobbycodeRegex.test(lobbycode) && rummy.addLobby(lobbycode, req.headers.authorization.slice(7))) {
      // res.redirect('/game/' + req.params.lobby + '/' + rummy.lobbies[code].token);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.json({ message: "Lobby created successfully", token: rummy.lobbies[lobbycode].token });
    } else {
      // res.redirect('/');
      // console.log("Error creating or joining lobby");
      res.statusCode = 500;
      res.json({ message: "Lobby is full, unavailable, or room code is invalid." });
    }
  });


//serve static files from frontend, if they exist
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/**
 * Get port from environment and store in Express.
 */
const defaultPort = "3000";
var port = normalizePort(process.env.PORT || defaultPort);
app.set('port', port);



/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.on('error', onError);
httpServer.on('listening', onListening);

// Start Server
httpServer.listen(port, () => {
  console.log("Listening on port " + port + "...");
});
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTPs server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}


module.exports = app;
