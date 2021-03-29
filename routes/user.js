const express = require('express')
const Person = require('../models/person')
const router = express.Router({mergeParams:true});
const phil = require('phil-reg-prov-mun-brgy');
const qr = require('qrcode')



router.get('/',(req,res)=>{
    res.render('home')
    //console.log(phil.regions)
})

router.get('/register',(req,res)=>{
    const regions =phil.regions
    res.render('register',{regions})
    //console.log(phil.regions)
})

router.post('/register',async(req,res)=>{
    const name = req.body.name
    //const region= phil.regions[`${ parseInt(req.body.regions)}`]
    //console.log(req.body)
    const province = (phil.provinces.filter(obj =>obj.prov_code ==req.body.province)).shift()
    //console.log(province)
    //console.log(req.body.municipal)
    const municipal = (phil.city_mun.filter(obj =>obj.mun_code==req.body.municipal )).shift()
    //console.log(municipal.name)  
    const barangay =req.body.barangay
    const user = await new Person({name:name,address:{barangay,municipal:municipal.name,province:province.name}})
    await user.save()
    qr.toDataURL(`${user._id}`,{ version: 5 },(err,src)=>{
         if(err) res.send('error')
        res.render('success',{src,name})
     })
})

//api para sa municipal
router.get('/province/:reg_code',(req,res)=>{
    const {reg_code}= req.params
    //console.log(req.params)
    res.send(phil.getProvincesByRegion(reg_code))
    //console.log(phil.getProvincesByRegion(reg_code))
})

router.get('/province/:reg_code/:prov_code',(req,res)=>{
    const {prov_code}= req.params
    //console.log(req.params)
    res.send(phil.getCityMunByProvince(prov_code))
  
})
router.get('/province/:reg_code/:prov_code/:mun_code',(req,res)=>{
    const {mun_code}= req.params
    //console.log(mun_code)
    res.send(phil.getBarangayByMun(mun_code))
  
})


module.exports =router