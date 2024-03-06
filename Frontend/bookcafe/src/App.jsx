import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserInputForm from './components/From';
import Form from './components/Form';

function App() {
  let [data, setData] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:3000/cafeList')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [data]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        {/* Add more routes as needed */}
      </Routes>

      <Navbar />
    </Router>
  );
}

export default App;
