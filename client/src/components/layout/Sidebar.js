import React, { useState, useContext } from 'react';
import '../../styles/sidebar.scss'
import { Link } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Icon from '@mdi/react';
import { mdiHome, mdiCog, mdiDelete } from '@mdi/js';
import { PageContext } from '../../App';

const Sidebar = () => {

  const { page, setPage } = useContext(PageContext);

  function select(e) {
    const target = e.target.getAttribute('data-link')

    switch(target) {
      case "home":
        setPage(1);
        break;
      case "pwgen":
        setPage(2);
        break;
      case "trash":
        setPage(3);
        break;
    }
  } 

  return (
    <div className='sidebar'>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" data-link="home" onClick={select} className={page === 1 ? 'active' : ''}>
            <Icon path={mdiHome} size={1.3} />
            Home</Link></li>
          <li>
            <Link to="/dashboard/password-generator" data-link="pwgen" onClick={select} className={page === 2 ? 'active' : ''}>
            <Icon path={mdiCog} size={1.3} color="white"/>
            Password Generator</Link></li>
          <li>
            <Link to="/dashboard/trash" data-link="trash" onClick={select} className={page === 3 ? 'active' : ''}>
            <Icon path={mdiDelete} size={1.3} color="white"/>
            Trash</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
