import React from 'react'
import Img from '../../assets/404.png'
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function NotFound() {
  return (
    <div className='user-landing'>
      <Header />
      <div className='content'>
        <img src={Img} height="300px"/>
        <h1>Error 404</h1>
        <h3>Page not found</h3>
        <p>The page you requested doesn't exist.</p>
      </div>
      <Footer />
    </div>
  )
}
