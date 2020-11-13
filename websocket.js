const WebSocket = require('ws');

//HTTPS server
var httpsServer = require("./server");
var app = require("./app")
const Game = require('./game');

const wss = new WebSocket.Server({ server });
const rummy = new Game(wss);

// Ignore Socket Errors
wss.on('error', () => console.log('*errored*'));
wss.on('close', () => console.log('*disconnected*'));

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
