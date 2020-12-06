var express = require('express');
var passport = require("passport");
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');

var cors = require("./cors");
//module used for token authentication
var authenticate = require("../authenticate");
const Users = require("../models/user");

var userRouter = express.Router();
userRouter.use(bodyParser.json());

const DEFAULT_ERROR = "HTTP 500. Unexpected error. Please try again";

// function to validate password and username
const inputValidator = (req, res, next) => {
  let { username, password } = req.body;
  let usernameRegex = /^[A-Za-z\d@._]{3,50}$/;
  //username must be between 3 and 50 alphanumeric characters or @._

  //Password: Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&_)
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,20}$/;
  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json({ err: {message: "Username or password is invalid"} });
    return;
  }

  // Check queryParameters
  // queryParameters.$or[0].username
  return next();
};

userRouter.post("/signup", cors.cors, inputValidator, (req, res, next) => {
  Users.register(new Users({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: {
        message: err.message
      } });
    } else {

      //placeholder info
      user.lastLogin = Date.now();

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: {message: err} });
          return;
        }
        var token = authenticate.getToken({ _id: user._id });
        console.log("token:", token);
        if (user.salt) user.salt = undefined;
        if (user.hash) user.hash = undefined;
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, token: token, user: user, status: "Registration successful" });
        });
      });
    }
  });
});

userRouter.post("/signin", cors.cors, inputValidator, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //if user doesn't exist, it does not count as an error, this info will be parsed in the info variable
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false, status: "Signin unsuccessful", err: {message: info.message} });
      return;
    }

    req.logIn(user, err => {
      if (err) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Signin unsuccessful", err: { message: "Could not sign user in" } });
        return;
      }
      Users.findByIdAndUpdate(
        user._id,
        { $set: { lastLogin: Date.now() } },
        { new: true }
      )
        .then(user => {
          var token = authenticate.getToken({ _id: req.user._id });
          if (user.salt) user.salt = undefined;
          if (user.hash) user.hash = undefined;
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, token: token, user: user, status: "You have successfully signed in." });
        });

    });
  })(req, res, next);
});

userRouter.get("/checkJWTToken", cors.corsWithOptions, (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid", success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid", success: true, user: user });
    }
  })(req, res);
});

//logging out this way DOESN'T work, user can still log in as usual, don't know why
//keep this in for completeness
// userRouter.post("/logout", cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//   req.session.destroy(function () {
//     console.log("Log user out");
//   });

// });

module.exports = userRouter;
