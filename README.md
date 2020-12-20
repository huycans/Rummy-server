# Rummy-server
Server for my secure rummy game. Written in NodeJS with Mongodb. This server runs on HTTPS and uses secure websocket. Frontend code (https://github.com/huycans/rummy-client) is included in this repo as a minified version.

The game allows players to resume playing after a disconnaction, assuming that players return to the game before a 5-minute timeout 

# How to install
1. Clone this package
2. Create secret key and certificate:
   1. cd secret
   2. openssl req -nodes -new -x509 -keyout server.key -out server.cert
   3. cd ..
3. npm install
4. Start your local MongoDB server. Modified 'mongoUrl' variable in config.js to your mongo's path
5. npm start
6. Signin/Signup and play the game

# Demo
A live demo of this project can be found here: https://rummy-cardgame.herokuapp.com/

Note that this demo doesn't use SSL due to Heroku's limitation.
