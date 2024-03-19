import React from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <div className='navbar'>
        <button><Link to="/">Home</Link></button>
        <button><Link to="/form">Login</Link></button>
        <button><Link to="/favourites">Favourites</Link></button>
        <button><Link to="/review">Review</Link></button>
        <button><Link to="/created_by">Created By</Link></button>
    </div>
  )
}

export default Navbar