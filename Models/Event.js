const mongo = require('mongoose')
const Mongo = process.env.MONGO || 'mongodb://127.0.0.1:27017/UG-smart'

mongo.connect(Mongo,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true})

const schema = mongo.Schema({
    Name:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Time:{
        type:Date,
        required:true
    },
    Flier:{
        type:String,
        required:true
    },
    usermail:{
        type:String,
        required:true
    }
},{timestamps:true})

const Event_model = mongo.model('Events',schema)

module.exports = { Event_model }