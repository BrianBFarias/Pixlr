import React, { useState, useEffect } from 'react';
import './navBar.css';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState('pic');

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.endsWith('/chat')) {
      setSelectedLink('chat');
    } else {
      setSelectedLink('pic');
    }
  }, [location]);

  return (
    <>
      <nav className='navbar'>
        <div className='options'>
          <Link
            to='/'
            id='pic'
            className={selectedLink === 'pic' ? 'nav-links-sel' : 'nav-links'}
          >
            <h1>PicBot</h1>
          </Link>
          <Link
            to='/chat'
            id='chat'
            className={selectedLink === 'chat' ? 'nav-links-sel' : 'nav-links'}
          >
            <h1>ChatBot</h1>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
