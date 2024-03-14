const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
const cors = require('cors')
require('dotenv').config()
app.use(cors())

const CafeModel = require('./models/CafeData.js')
const UserReview = require('./models/UserReview.js')

// Import CRUD routes
const router = require('./routes.js');

// Middleware for parsing request bodies
app.use(express.json())
app.use("/common", router)

// Connect to MongoDB
  //start database
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

  //stop database
const stopDatabase = async() =>{
  try{
    await mongoose.disconnect()
    console.log("disconnected")
  }catch(err){
    console.error(err)
  }
}

// check if database is connected and display message accordingly
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

app.get('/cafeList', async (req, res) => {
  let x = await CafeModel.find()
  res.send(x);
});

//


//Getting and updating the data from the api after the user inputs the information given in the form page.
app.get('/userData', async (req, res)=>{
    try{
      const userEntity = await UserReview.find()
      res.send(userEntity)
    }catch (error) {
      console.error("Error fetching entity list:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  
app.post('/userData', async (req, res) => {
  const { Cafename, Rating, Review } = req.body;
  const newEntity = new UserReview({ Cafename, Rating, Review });

  try {
    const savedEntity = await newEntity.save();
    res.json(savedEntity);
  } catch (error) {
    console.error("Error adding entity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint for delete operation to delete an entity by it's id
app.delete('/userData/:id', async(req, res)=>{
  try{
    const {id} = req.params
    await UserReview.findByIdAndDelete(id)
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.put('/userData/:id', async(req, res)=>{
//   try{
//     const {id} = req.params
//     await UserReview.findByIdAndUpdate({_id:id},{})
//     res.status(200).json({ message: 'Entry updated successfully' });
//   } catch (error) {
//     console.error('Error updating entry:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.put('/userData/:id', async(req, res)=>{
    let data=req.body;
  try{
    const {id} = req.params;
    const updatedData = req.body; // Get updated data from request body
    await UserReview.findByIdAndUpdate({_id:id}, {Cafename:data.Cafename,Rating:data.Rating,Review:data.Review}); // Update document with new data
    res.status(200).json({ message: 'Entry updated successfully' });
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//start server

  app.listen(3000, async () => {
    await startDatabase();
    console.log('🚀 Server running on PORT: 3000');
  })


module.exports = app