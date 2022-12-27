const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
require('colors')
require("dotenv").config();

//middleware
app.use(cors())
app.use(express.json())
//MongoDb


const uri = "mongodb+srv://social-media:eMay9QssYQdPc8HQ@cluster0.cvl7r98.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
   const postsCollection = client.db('Social-app').collection('posts')
   app.post("/posts",async(req,res)=>{
    const post = req.body
    const result = await postsCollection.insertOne(post)
    res.send(result)
   })
  } finally {
   
  }
}
run().catch(console.dir);

//MongoDb
app.get('/',(req,res)=>{
    res.send(' Server is Runnig')
})
app.listen(port,(req,res)=>{
   console.log(`Server is running on ${port}`.cyan)
})