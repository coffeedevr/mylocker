import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
          Home</Link></li>
        <li>
          <Link to="/grocery">
          Grocery List</Link></li>
        <li>
          <Link to="/search">
          Search</Link></li>
      </ul>
    </nav>
  )
}

export default SideNav;
