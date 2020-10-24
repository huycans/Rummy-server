const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  gamePlayed: {
    type: Number,
    default: 0
  },
  gameWon: {
    type: Number,
    default: 0
  },
  gameLost: {
    type: Number,
    default: 0
  },
}, {
  timestamps: {
    createdAt: "createdTime",
    updatedAt: "lastUpdatedTime"
  }
});


// add a virtual id field 
userSchema.set('toJSON', {
  virtuals: true
});
userSchema.plugin(passportLocalMongoose);


let Users = mongoose.model("User", userSchema);

module.exports = Users;

