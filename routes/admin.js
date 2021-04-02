const express = require('express');
const Person = require('../models/person');
const Activity = require('../models/activity');
const { find } = require('../models/person');
const Establishment = require('../models/establishment');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.render('admin/dashboard');
});

//dd an route pag add establishment
router.get('/establishment', (req, res) => {
  res.render('admin/establishment');
});

//dd pag registr
router.post('/establishment/add', async (req, res) => {
  const { name, username, password } = req.body;
  const establishment = await new Establishment({
    name: name,
    username: username,
  });
  const newUser = await Establishment.register(establishment, password);
  res.send(newUser);
  console.log(req.body);
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
  let date = await new Date(dateIn);
  date.setHours(0, 0, 0, 0);
  const activity = await Activity.find({
    $and: [
      {
        store: { $eq: store },
      },
      {
        dateIn: {
          $lte: dateOut,
        },
        dateIn: {
          $gte: date,
          $ne: dateIn,
        },
      },
    ],
  }).populate({
    //dd kada path na person n papapolate nya
    path: 'person',
    populate: { path: 'person' },
    select: ['name', 'address'],
  });
  res.render('admin/contact/table', { activity });
});
module.exports = router;
