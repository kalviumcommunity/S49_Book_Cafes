import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Form from './components/Form';
import Review from './components/Review';
import Favourites from './components/Favourites';
import UpdateEntity from './components/UpdateEntity';
import CreatedBy from './components/CreatedBy';

function App() {
  let [data, setData] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:3000/cafeList')
      .then((res) =>setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path='/review' element={<Review/>}/>
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path="/edit/:keyId" element={<UpdateEntity/>} />
          <Route path="/created_by" element={<CreatedBy/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
