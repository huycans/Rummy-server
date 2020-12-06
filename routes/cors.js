const express = require("express");
const cors = require("cors");

const whitelist = process.env.WHITELIST || ["https://localhost:3000"];
var corsOptionDelegate = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
// exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);
