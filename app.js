const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const partials = require('express-partials')
const app = express()
const path =require('path')
const qr = require('qrcode')
const ejsMate = require('ejs-mate')

//pag open sa databes
mongoose.connect('mongodb://localhost/contact-tracing', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DATABASE IS CONNECTED')
});

//view tas path sa views
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//mga routes
const userRoutes= require('./routes/user')

//static file
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.engine('ejs',ejsMate)


//dd pag gamit sa routes
app.use('/',userRoutes)
























app.listen(3000,()=>{
    console.log('app is running on port 3000')
})