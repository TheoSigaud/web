let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AppointementSchema = new Schema({
  date: Date,
  time: Date
});

let Appointement = mongoose.model("Appointement", AppointementSchema);
module.exports = Appointement;