const express = require('express');
const { isLoggedIn } = require('../middleware');
const Activity = require('../models/activity');
const router = express.Router({ mergeParams: true });
const Person = require('../models/person');

//pag scan pag entrance
router.get('/in', isLoggedIn, (req, res) => {
  res.render('qrScanIN');
});

//exit route pag scan sa barcode sa exit
router.get('/out', isLoggedIn, (req, res) => {
  res.render('qrScanOUT');
});

//find database create an activity
//qrcode in
router.post('/scan/:id/in', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const person = await Person.findById(id);
  const activity = await new Activity({ name: person, dateIn: new Date() });
  activity.store = await req.user._id;
  person.activity = await activity;
  await activity.save();
  await person.save();
  res.send(person.name);
});

router.post('/scan/:id/out', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const person = await Person.findById(id);
  // dd gn find and activity sa user
  let activity = await Activity.find({
    $and: [
      { dateIn: { $lte: new Date() } },
      { name: { $eq: person } },
      { store: { $eq: req.user._id } },
    ],
  });
  activity = await activity[activity.length - 1];
  activity.dateOut = await new Date();
  await activity.save();
  res.send(person.name);

  console.log(activity);
});

module.exports = router;
