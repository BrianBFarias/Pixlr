import React, { useState, useEffect } from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';


function Navbar() {

  const selected = async (e) => {
    const unselected = document.querySelector('.nav-links');
    const selected = document.querySelector('.nav-links-sel');
    unselected.className = 'nav-links-sel';
    selected.className = 'nav-links';
  }

  return (
    <>
      <nav className='navbar'>
        <div className='options'>
            <Link
                to='/'
                className='nav-links-sel'
                onClick={selected}
              >
                <h1>PicBot</h1>
              </Link>
              <Link
                to='/chat'
                className='nav-links'
                onClick={selected}
              >
                <h1>ChatBot</h1>
              </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
