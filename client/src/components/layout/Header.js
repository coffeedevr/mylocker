import React from "react"
import Logo from '../../assets/suitcase.png'

const Header = () => {
  return (
    <header>
      <div className="header-wrapper">
        <img src={Logo} className="img logo"  />
        <h1 id="header-text">MyLocker</h1>
      </div>
    </header>
  )
}

export default Header