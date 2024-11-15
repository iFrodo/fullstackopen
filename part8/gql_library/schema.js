const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5,
    },
    phone:{
        type:String,
        minLength:5,
    }
})
module.exports = mongoose.model('Person',schema)