import React from 'react'
import dummydata from './dummydata.json'

function Home() {

  

  return (
    <div>
        <div>{dummydata.map((item)=>{
        return <div>
          <h1>{item.id}</h1>
          <h1>{item.cafeName}</h1>
          <h3>{item.loc}</h3>
          <h4>{item.type}</h4>
          <h4>{item.ratings}</h4>
          </div>
        })}</div>
    </div>
  )
}

export default Home