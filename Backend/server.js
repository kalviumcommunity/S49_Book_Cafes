const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
const cors = require('cors')
require('dotenv').config()
app.use(cors())

const CafeModel = require('./models/CafeData.js')
const UserInputModel = require('./models/UserInputData.js')

// Import CRUD routes
const router = require('./routes.js');

// Middleware for parsing request bodies
app.use(express.json())
app.use("/common", router)

// Connect to MongoDB



const startDatabase = async() =>{
  try{
    await mongoose.connect(process.env.API_LINK, {
        useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("connected")
  }catch(err){
    console.error(err)
  }
}

const stopDatabase = async() =>{
  try{
    await mongoose.disconnect()
    console.log("disconnected")
  }catch(err){
    console.error(err)
  }
}

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

app.get('/cafeList', async (req, res) => {
  let x = await CafeModel.find()
  res.send(x);
});

//Getting and updating the data from the api after the user inputs the information given in the form page.
app.get('/userData', async (req, res)=>{
    try{
      const userEntity = await UserInputModel.find()
      res.send(userEntity)
    }catch (error) {
      console.error("Error fetching entity list:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  
  app.post('/userData', async (req, res) => {
    const { name, email, favBook } = req.body;
    const newEntity = new UserInputModel({ name, email, favBook });

    try {
      const savedEntity = await newEntity.save();
      res.json(savedEntity);
    } catch (error) {
      console.error("Error adding entity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//start server

  app.listen(3000, async () => {
    await startDatabase();
    console.log('🚀 Server running on PORT: 3000');
  })


module.exports = app