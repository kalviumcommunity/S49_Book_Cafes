const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
const cors = require('cors')
require('dotenv').config()
app.use(cors())

const CafeModel = require('./models/CafeData.js')

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

//handle shutdown signals
const port = 3000;

process.on('SIGINT', async () => {
  await stopDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopDatabase();
  process.exit(0);
});

//start server
if (require.main === module) {
  app.listen(port, async () => {
    await startDatabase();
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app