const express = require('express')
const Person = require('../models/person')
const router = express.Router({mergeParams:true});

router.get("/login",(req,res)=>{
    res.render('admin/login')
})





module.exports =router