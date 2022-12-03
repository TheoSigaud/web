let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: String,
  password: String,
  role: Number
});

let User = mongoose.model("User", UserSchema);
module.exports = User;