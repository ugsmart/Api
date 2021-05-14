const mongo = require('mongoose')
const Mongo = process.env.MONGO || 'mongodb://127.0.0.1:27017/UG-smart'

mongo.connect(Mongo,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true})

const schema = mongo.Schema({
    Program:{
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
    Image:{
        type:String,
        required:true
    },
    usermail:{
        type:String,
        required:true
    }
},{timestamps:true})

const Tutor_model = mongo.model('Tutors',schema)

module.exports = { Tutor_model }