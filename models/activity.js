const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  store: {
    type: Schema.Types.ObjectId,
    //required: true,
    ref: 'Establishment',
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },

  dateIn: {
    type: Date,
  },
  dateOut: {
    type: Date,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
