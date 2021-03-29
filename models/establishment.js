const mongoose = require('mongoose'); // dd gn import an mongoose
//dd gamit n cya para sa password tas username automatic na naka add
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const establishmentSchema = new Schema({
  name: String,
});
establishmentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Establishment', establishmentSchema);
