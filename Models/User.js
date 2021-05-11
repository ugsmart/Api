const mongo = require('mongoose')
const Mongo = process.env.MONGO || 'mongodb://127.0.0.1:27017/UG-smart'

mongo.connect(Mongo,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true})

const schema = mongo.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Contact:{
        type:String,
        required:true
    },
    Tutor:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

const User_model = mongo.model('Users',schema)

module.exports = { User_model }