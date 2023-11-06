import React, { useState, useEffect } from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';


function Navbar() {

  const [selectedLink, setSelectedLink] = useState('pic');

  const handleLinkClick = (id) => {
    setSelectedLink(id);
  }

  return (
    <>
      <nav className='navbar'>
        <div className='options'>
          <Link
            to='/'
            id='pic'
            className={selectedLink === 'pic' ? 'nav-links-sel' : 'nav-links'}
            onClick={() => handleLinkClick('pic')}
          >
            <h1>PicBot</h1>
          </Link>
          <Link
            to='/chat'
            id='chat'
            className={selectedLink === 'chat' ? 'nav-links-sel' : 'nav-links'}
            onClick={() => handleLinkClick('chat')}
          >
            <h1>ChatBot</h1>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
