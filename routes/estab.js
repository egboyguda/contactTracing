const express = require('express')
const Person = require('../models/person')
const router = express.Router({mergeParams:true});
//const phil = require('phil-reg-prov-mun-brgy');


router.get('/:id',async(req,res)=>{
    const {id} = req.params
    const user = await Person.findById(id)

    res.send(user.name)


})







module.exports =router