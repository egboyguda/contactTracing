const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const partials = require('express-partials');
const app = express();
const path = require('path');
const qr = require('qrcode');
const ejsMate = require('ejs-mate');
const session = require('express-session');
require('dotenv').config();
const Establishment = require('./models/establishment');
const passport = require('passport');
const localStrategy = require('passport-local');
const PORT = process.env.PORT || 3000;

//pag open sa databes

mongoose.connect('mongodb://localhost/contact-tracing' || process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DATABASE IS CONNECTED');
});

// n dd an sessionconfig
//dd sin ma c save pan session para di cg login
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use((req, res, next) => {
  //ibig sabihin cn maaccess mo an varible na success sa tanana
  //na ejs
  //maaacess n tanan na varible pag naka lucal
  //console.log(req.session)
  res.locals.currentUser = req.user;
  next();
});

//dd pag use sa session
app.use(session(sessionConfig));

//dd pag gamit na sa passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Establishment.authenticate()));

//dd para n sa session log in log out
passport.serializeUser(Establishment.serializeUser());
passport.deserializeUser(Establishment.deserializeUser());

//view tas path sa views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/qrcode', (req, res) => {
  res.render('qrScan');
});

//mga routes
const userRoutes = require('./routes/user');
const qrcodeRoutes = require('./routes/qrcode');
const establishmentRoutes = require('./routes/estab');

//test register
// app.get('/fakeuser', async (req, res) => {
//   const establishment = new Establishment({ name: 'store', username: 'gboy' });
//   const newUser = await Establishment.register(establishment, 'guda');
//   res.send(newUser);
// });

//static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

//dd pag gamit sa routes
app.use('/', userRoutes);
app.use('/qrcode', qrcodeRoutes);
app.use('/estab', establishmentRoutes);

app.listen(PORT, () => {
  console.log('app is running on port 3000');
});
