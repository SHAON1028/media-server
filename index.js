const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
   const commentsCollection = client.db('Social-app').collection('comments')


   app.post("/posts",async(req,res)=>{
    const post = req.body
    const result = await postsCollection.insertOne(post)
    res.send(result)


    
   })
   app.get('/posts',async (req,res)=>{
    const query = {}
    const posts = await postsCollection.find(query).sort({totalLikes:-1}).limit(3).toArray()
    res.send(posts)
}) 
   app.get('/allposts',async (req,res)=>{
    const query = {}
    const posts = await postsCollection.find(query).sort({_id:-1}).toArray()
    res.send(posts)
}) 
   app.put('/allposts/:id',async (req,res)=>{
    const id = req.params.id
    console.log(id)
    const  updateLike = parseInt(req.body.totalLikes )
    console.log(updateLike)
    const filter = { _id:ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        totalLikes: updateLike
      },
    };
    const posts = await postsCollection.updateOne(filter, updateDoc, options)
    res.send(posts)
}) 

app.post('/allcomments', async (req, res)=>{
  const comment = req.body
  const result = await commentsCollection.insertOne(comment)
  res.send(result)
})
  //  ends
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