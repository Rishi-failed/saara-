import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="brand-name">WebDoc</h1>
            <span className="brand-tagline">Your Health Guide</span>
          </div>
          <nav className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
