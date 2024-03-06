import React from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <div>
        <button><Link to="/form">Login</Link></button>
    </div>
  )
}

export default Navbar