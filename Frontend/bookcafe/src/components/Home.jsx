import React from 'react'
import dummydata from './dummydata.json'
import UserInputForm from './From'

function Home() {

  

  return (
    <div>
      <UserInputForm/>
        <div>{dummydata.map((data)=>{
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
    </div>
  )
}

export default Home