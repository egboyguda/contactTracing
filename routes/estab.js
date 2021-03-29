const express = require('express');
const Person = require('../models/person');
const router = express.Router({ mergeParams: true });
//const phil = require('phil-reg-prov-mun-brgy');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const user = await Person.findById(id);
//   console.log(user.name);
//   res.send(user.name);
// });

//dd pag log in sa store or establishment
router.get('/login', (req, res) => {
  res.render('establishment/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/estab/dashboard');
  }
);

//dd an dashboard sa establishment

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('establishment/dashboard');
});
module.exports = router;
