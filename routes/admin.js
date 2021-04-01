const express = require('express');
const Person = require('../models/person');
const Activity = require('../models/activity');
const { find } = require('../models/person');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.render('admin/dashboard');
});

//dd an route pag add establishment
router.get('/establishment', (req, res) => {
  res.render('admin/establishment');
});

//dd an route pag track sa tawo
// sa knya mga activity
router.get('/track', (req, res) => {
  res.render('admin/track');
});

//axios api front end
router.get('/getuser/:id', async (req, res) => {
  const { id } = req.params;
  //const person = await Person.findById(id);
  const activity = await Activity.find({
    // dd nag hanap acticity na parehas an _Id sa id na params
    person: { $eq: id },
  })
    .populate({
      //dd kada path na person n papapolate nya
      path: 'person',
      populate: { path: 'person' },
      select: 'name',
    })
    .populate({
      //dd kada path na person n papapolate nya
      path: 'store',
      populate: { path: 'establishment' },
      select: 'name',
    });
  //await activity.populate('person');

  res.json(activity);
  //console.log(activity);
});

// dd pag find sa mga tawo na nakada sun na timeframe
router.get('/getuser', async (req, res) => {
  const { store, dateIn, dateOut } = req.query;
  const activity = await Activity.find({
    $and: [
      {
        store: { $eq: store },
      },
      {
        dateIn: {
          $gt: dateIn,
          $lte: dateOut,
        },
      },
    ],
  }).populate({
    //dd kada path na person n papapolate nya
    path: 'person',
    populate: { path: 'person' },
    select: 'name',
  });

  res.send(activity);
});
module.exports = router;
