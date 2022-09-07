const mongoose = require("mongoose");

const pokeonSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  HPCurrent: {type:Number, required: false},
  HPMax: {type:Number, required: false},

});

module.exports = mongoose.model('Pokemon', pokeonSchema);
