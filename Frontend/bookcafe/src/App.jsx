import './App.css'
import Home from './components/Home'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  let [data, setData] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/cafeList')
         .then(res => setData(res.data) )
         .catch(err => console.error(err))
  }, [data])

  return (
    <>
      <Home/>
      <div>{data && data.map((data)=>{
        return(
          <div className="main" key={data.id}>
            <h3>{data.id}</h3>
            <h3>{data.cafeName}</h3>
            <h3>{data.loc}</h3>
            <h3>{data.type}</h3>
            <h3>{data.ratings}</h3>
          </div>
        )
      })}</div>
    </>
  )
}

export default App
