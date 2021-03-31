const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['female', 'male'],
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: 'Activity',
  },
  address: {
    barangay: String,
    municipal: String,
    province: String,
  },
});
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
