var https = require('https');
var fs = require('fs');
var path = require('path');
var app = require("./app")
/**
 * Create HTTPS server.
 */

var httpsServer = https.createServer({
  key: fs.readFileSync(path.win32.resolve(__dirname, "./secret/server.key")),
  cert: fs.readFileSync(path.win32.resolve(__dirname, './secret/server.cert'))
}, app);

module.exports = httpsServer;