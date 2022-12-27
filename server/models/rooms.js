let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RoomSchema = new Schema({
  name: String,
  max: Number
});

let Room = mongoose.model("Room", RoomSchema);
module.exports = Room;