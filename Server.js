const express = require('express')
const app = express()
const {gql,ApolloServer,makeExecutableSchema} = require('apollo-server-express')
const body = require('body-parser')
const {Event_model} = require("./Models/Event")
const {Product_model} = require("./Models/Product")
const {User_model} = require("./Models/User")
const {Tutor_model} = require("./Models/Tutor")

app.use(body.json())

const Schema =gql`
scalar Date

type Image{
    Image1:String
    Image2:String
    Image3:String
}

input Photo{
    Image1:String
    Image2:String
    Image3:String
}

type Product{
    _id:ID
    Name:String
    Category:String
    Bater:Boolean
    Price:String
    Images:Image
    usermail:String
    createdAt:Date
    updatedAt:Date
}

type Event{
    _id:ID
    Name:String
    Category:String
    Description:String
    Price:String
    Time:String
    Flier:String
    usermail:String
    createdAt:Date
    updatedAt:Date
}

type User{
    _id:ID
    Name:String
    Email:String
    Contact:String
    Tutor:Boolean
    createdAt:Date
    updatedAt:Date
}

type Tutor{
    _id:ID
    Program:String
    Description:String
    Price:String
    Image:String
    usermail:String
}

type Query{
    text:String
    Events: [Event]
    Products: [Product]
    Tutors: [Tutor]
    Event_Cate(cate:String!): [Event]
    Product_Cate(cate:String!): [Product]
    Profile(user:String!): User
}

type Mutation{
    Add_Tutor(
      Program:String!
      Description:String!
      Price:String!
      Image:String!
      usermail:String!): Tutor

    Add_User(
      Name:String!
      Email:String!
      Contact:String!): User
    
    Add_Product(
      Name:String!
      Category:String!
      Bater:String!
      Price:String!
      Images:Photo
      usermail:String!
    ): Product
    
    Add_Event(
      Name:String!
      Category:String!
      Description:String!
      Price:String!
      Time:String!
      Flier:String!
      usermail:String!
    ): Event
}`

const root ={
    Query:{
        text: ()=> 'Welcome to Graphql',

        Events: ()=> Event_model.find({},(err,docs)=>{
            if(docs) return docs
            else return err
        }),

        Products: ()=> Product_model.find({},(err,docs)=>{
            if(docs) return docs
            else return err
        }),

        Tutors: ()=> Tutor_model.find({},(err,docs)=>{
            if(docs) return docs
            else return err
        }),

        Event_Cate: (parent,{cate})=> Event_model.find({Category:cate},(err,docs)=>{
            if(docs) return docs
            return err
        }),
        
        Product_Cate: (parent,{cate})=> Product_model.find({Category:cate},(err,docs)=>{
            if(docs) return docs
            return err
        }),

        Profile: (parent,{user}) => User_model.findOne({Email:user},(err,docs)=>{
            if(docs) return docs
            return err
        })

    },

    Mutation:{
        Add_User: (parent,args) => {
            const file = new User_model(args)
            return file.save()
        },

        Add_Tutor: (parent,args) => {
            const file = new Tutor_model(args)
            return file.save()
        },

        Add_Product: (parent,args) =>{
            const file = new Product_model(args)
            return file.save()
        },

        Add_Event: (parent,args) =>{
            const file = new Event_model(args)
            return file.save()
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: root
})

const server = new ApolloServer({playground:true,introspection:true,schema:schema})
server.applyMiddleware({app,bodyParserConfig:true})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log('Server up and Running.'))