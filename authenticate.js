var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");
// var FacebookTokenStrategy = require("passport-facebook-token");

var config = require("./config");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var privateKey = fs.readFileSync(path.win32.resolve(__dirname,"./secret/server.key"));
exports.getToken = function(user) {
  return jwt.sign(user, privateKey, { expiresIn: 7200});//expires in 2 hours
};

var opts = {};
//jwtFromRequest: how the jsonwebtoken should be extracted from the incoming request message
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = privateKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("Jwt payload", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", {session: false});


exports.verifyAdmin = (req, res, next) => {
  // console.log(req);
  if (req.user.admin === true){
    return next();
  }
  else {
    var err = new Error("You are not authorized to perform this operation");
    err.status = 403;
    return next(err)
  }
}
