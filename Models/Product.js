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
    Bater:{
        type:Boolean,
        required:true,
        default:false
    },
    Price:{
        type:String,
        required:true
    },
    Images:{
        Image1:{
            type:String,
            required:true
        },
        Image2:{
            type:String
        },
        Image3:{
            type:String
        },
    },
    usermail:{
        type:String,
        required:true
    },
},{timestamps:true})

const Product_model = mongo.model('Products',schema)

module.exports = { Product_model }