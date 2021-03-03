import express, { response } from "express"
import { connect } from "http2"
import mongoose from "mongoose"
import cards from './dbCards.js'
import Cors from 'cors'

// Create the following 

// App Config 
const app = express()
const port = process.env.PORT || 8001
const connection_url= 'mongodb+srv://admin:nN1jCO7n2QdWJJfa@cluster0.emcqt.mongodb.net/tinderdb?retryWrites=true&w=majority'
// Middlewares
app.use(express.json())
app.use(Cors())


// DB Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})


// API EndPoints 
app.get("/", (req,res)=> res.status(200).send('Hello World'))

app.post('/tinder/cards', (req,res)=>{
    const dbCard =req.body
    cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards',(req,res)=>{
    cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


// Listener 
app.listen(port, ()=>console.log(`listing on localhost: ${port}`))
