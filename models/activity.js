const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Activity = new Schema({
    store:{
        type:Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:Schema.Types.ObjectId
    },
    dateIn:{
        type:Date
    },
    dateOut:{
        type:Date
    }
})